/*
 * Lalatoto: «Byg sengen». Farvevalget skifter billedet af sættet og finder
 * den rigtige variant af hver vare. Varer kan fravælges, og knappen lægger
 * de valgte i kurven på én gang og åbner kurven.
 */
(function () {
  if (customElements.get('lalatoto-build-bed')) return;

  function formatMoney(cents, format) {
    var value = Number(cents) || 0;
    var pattern = /\{\{\s*(\w+)\s*\}\}/;
    var template = format || '{{amount}}';

    function split(amount, decimals, thousands, separator) {
      var fixed = (amount / 100).toFixed(decimals);
      var parts = fixed.split('.');
      var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      return parts[1] ? whole + separator + parts[1] : whole;
    }

    var match = template.match(pattern);
    var key = match ? match[1] : 'amount';
    var amount;
    switch (key) {
      case 'amount_no_decimals':
        amount = split(value, 0, ',', '.');
        break;
      case 'amount_with_comma_separator':
        amount = split(value, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        amount = split(value, 0, '.', ',');
        break;
      case 'amount_with_apostrophe_separator':
        amount = split(value, 2, "'", '.');
        break;
      case 'amount_with_space_separator':
        amount = split(value, 2, ' ', ',');
        break;
      default:
        amount = split(value, 2, ',', '.');
    }
    return template.replace(pattern, amount);
  }

  function readJson(root, selector) {
    var node = root.querySelector(selector);
    try {
      return node ? JSON.parse(node.textContent) : null;
    } catch (error) {
      return null;
    }
  }

  class LalatotoBuildBed extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;

      this.items = readJson(this, '[data-items]') || [];
      this.texts = readJson(this, '[data-texts]') || {};
      this.format = this.getAttribute('data-money-format');
      this.button = this.querySelector('[data-add]');
      this.label = this.querySelector('[data-add-label]');
      this.message = this.querySelector('[data-message]');

      this.addEventListener('change', (event) => {
        if (event.target.matches('input[type="radio"]')) this.setColor(event.target.value);
        if (event.target.matches('[data-item-toggle]')) this.update();
      });
      this.button.addEventListener('click', () => this.add());

      var checked = this.querySelector('input[type="radio"]:checked');
      this.setColor(checked ? checked.value : '');
    }

    setColor(color) {
      this.color = color;
      this.querySelectorAll('[data-color]').forEach((image) => {
        image.classList.toggle('is-active', image.getAttribute('data-color') === color);
      });
      var name = this.querySelector('[data-color-name]');
      if (name) name.textContent = color;
      this.message.textContent = '';
      this.update();
    }

    variantFor(handle) {
      var item = this.items.find((entry) => entry.handle === handle);
      return item && item.variants ? item.variants[this.color] : null;
    }

    update() {
      var total = 0;
      var count = 0;

      this.querySelectorAll('[data-handle]').forEach((row) => {
        var variant = this.variantFor(row.getAttribute('data-handle'));
        var toggle = row.querySelector('[data-item-toggle]');
        var note = row.querySelector('[data-item-note]');
        var price = row.querySelector('[data-item-price]');
        var usable = Boolean(variant && variant.available);

        toggle.disabled = !usable;
        row.classList.toggle('is-unavailable', !usable);
        row.classList.toggle('is-off', !toggle.checked);
        note.textContent = !variant ? this.texts.missing || '' : variant.available ? '' : this.texts.soldOut || '';

        if (variant) {
          var html = '<span>' + formatMoney(variant.price, this.format) + '</span>';
          if (variant.compare > variant.price) {
            html += ' <s>' + formatMoney(variant.compare, this.format) + '</s>';
          }
          price.innerHTML = html;
        } else {
          price.textContent = '';
        }

        if (usable && toggle.checked) {
          total += variant.price;
          count += 1;
        }
      });

      this.querySelector('[data-total]').textContent = formatMoney(total, this.format);
      this.button.disabled = count === 0;
    }

    selected() {
      var lines = [];
      this.querySelectorAll('[data-handle]').forEach((row) => {
        var toggle = row.querySelector('[data-item-toggle]');
        var variant = this.variantFor(row.getAttribute('data-handle'));
        if (toggle.checked && variant && variant.available) lines.push({ id: variant.id, quantity: 1 });
      });
      return lines;
    }

    add() {
      var lines = this.selected();
      if (!lines.length) {
        this.message.textContent = this.texts.none || '';
        return;
      }

      var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';
      this.button.disabled = true;
      this.button.setAttribute('aria-busy', 'true');
      this.message.textContent = '';

      fetch(root + 'cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: lines })
      })
        .then((response) => {
          if (!response.ok) throw new Error('cart');
          return response.json();
        })
        .then(() => {
          this.message.textContent = this.texts.added || '';
          document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
          var drawer = document.querySelector('cart-drawer');
          if (drawer && typeof drawer.show === 'function') {
            drawer.show();
          } else {
            window.location.href = root + 'cart';
          }
        })
        .catch(() => {
          this.message.textContent = this.texts.error || '';
        })
        .finally(() => {
          this.button.removeAttribute('aria-busy');
          this.update();
        });
    }
  }

  customElements.define('lalatoto-build-bed', LalatotoBuildBed);
})();
