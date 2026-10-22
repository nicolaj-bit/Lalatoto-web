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
      this.bundlePercent = Number(this.getAttribute('data-bundle-percent')) || 0;

      // Testvisning (kun i forhåndsvisning): udsolgte varer vises som på lager,
      // men lægges aldrig i kurven.
      if (this.hasAttribute('data-test-stock')) {
        this.items.forEach((item) => {
          (item.variants || []).forEach((variant) => {
            if (!variant.available) {
              variant.available = true;
              variant.fake = true;
            }
          });
        });
      }

      this.addEventListener('change', (event) => {
        if (event.target.matches('[data-all-color]')) this.setColor(event.target.value);
        if (event.target.matches('[data-item-color]')) this.setItemColor(event.target);
        if (event.target.matches('[data-item-toggle]')) this.update();
        if (event.target.matches('[data-item-variant], [data-item-option]')) this.update();
      });
      this.button.addEventListener('click', () => this.add());

      var checked = this.querySelector('[data-all-color]:checked');
      this.setColor(checked ? checked.value : '');
    }

    showImage(color) {
      this.querySelectorAll('[data-color]').forEach((image) => {
        image.classList.toggle('is-active', image.getAttribute('data-color') === color);
      });
    }

    // Hele sættet i én farve: alle varer skifter til farven.
    setColor(color) {
      this.querySelectorAll('[data-item-color]').forEach((input) => {
        input.checked = input.value === color;
      });
      this.showImage(color);
      this.message.textContent = '';
      this.update();
    }

    // Én vare skifter farve. Billedet følger den sidst valgte farve, og den
    // fælles vælger viser «Blandet», når varerne ikke har samme farve.
    setItemColor(input) {
      this.showImage(input.value);
      this.message.textContent = '';
      this.update();
    }

    colorFor(row) {
      var input = row.querySelector('[data-item-color]:checked');
      return input ? input.value : '';
    }

    syncAllColor() {
      var colors = [];
      this.querySelectorAll('[data-handle]').forEach((row) => {
        var item = this.itemFor(row);
        if (item && !item.extra) colors.push(this.colorFor(row));
      });
      var same = colors.length && colors.every((color) => color === colors[0]);
      this.querySelectorAll('[data-all-color]').forEach((input) => {
        input.checked = Boolean(same) && input.value === colors[0];
      });
      var name = this.querySelector('[data-color-name]');
      if (name) name.textContent = same ? colors[0] : this.texts.mixed || '';
    }

    itemFor(row) {
      var handle = row.getAttribute('data-handle');
      return this.items.find((entry) => entry.handle === handle) || null;
    }

    // Farvevarer: varianten med den valgte farve og de valgte øvrige
    // valgmuligheder (fx størrelse). Ekstra varer: varianten fra egen vælger.
    variantFor(row, color) {
      var item = this.itemFor(row);
      if (!item || !item.variants || !item.variants.length) return null;
      if (item.extra) {
        var select = row.querySelector('[data-item-variant]');
        if (!select) return item.variants[0];
        return item.variants.find((variant) => String(variant.id) === select.value) || null;
      }
      var wanted = [color || this.colorFor(row)];
      row.querySelectorAll('[data-item-option]').forEach((option) => wanted.push(option.value));
      return (
        item.variants.find((variant) => wanted.every((value) => variant.options.indexOf(value) !== -1)) || null
      );
    }

    // Sætrabatten gælder, når mindst to af sættets varer er valgt – samme regel
    // som den automatiske rabat i Shopify. Har en vare et større tilbud, vinder det.
    bundleActive() {
      if (!this.bundlePercent) return false;
      var count = 0;
      this.querySelectorAll('[data-handle]').forEach((row) => {
        var item = this.itemFor(row);
        var variant = this.variantFor(row);
        var toggle = row.querySelector('[data-item-toggle]');
        if (item && item.bundle && variant && variant.available && toggle.checked) count += 1;
      });
      return count >= 2;
    }

    priceFor(item, variant, bundle) {
      if (!bundle || !item.bundle) return variant.price;
      var bundlePrice = Math.round((variant.base * (100 - this.bundlePercent)) / 100);
      return Math.min(variant.price, bundlePrice);
    }

    update() {
      var total = 0;
      var count = 0;
      var saving = 0;

      // Først tilgængelighed og flueben, så sætrabatten regnes ud fra de rigtige valg.
      this.querySelectorAll('[data-handle]').forEach((row) => {
        var item = this.itemFor(row);
        var variant = this.variantFor(row);
        var toggle = row.querySelector('[data-item-toggle]');
        var usable = Boolean(variant && variant.available);
        toggle.disabled = !usable;
        if (!usable) toggle.checked = false;
        else if (row.dataset.wasUnavailable === 'true' && item && !item.extra) toggle.checked = true;
        row.dataset.wasUnavailable = String(!usable);
      });

      this.querySelectorAll('[data-handle]').forEach((row) => {
        var item = this.itemFor(row);
        if (!item || item.extra) return;
        row.querySelectorAll('[data-item-color]').forEach((input) => {
          input.disabled = !this.variantFor(row, input.value);
        });
      });
      this.syncAllColor();

      var bundle = this.bundleActive();

      this.querySelectorAll('[data-handle]').forEach((row) => {
        var item = this.itemFor(row) || {};
        var variant = this.variantFor(row);
        var toggle = row.querySelector('[data-item-toggle]');
        var note = row.querySelector('[data-item-note]');
        var price = row.querySelector('[data-item-price]');
        var usable = Boolean(variant && variant.available);

        var thumb = row.querySelector('[data-item-thumb] img');
        if (thumb && variant && variant.image && thumb.getAttribute('src') !== variant.image) {
          thumb.removeAttribute('srcset');
          thumb.setAttribute('src', variant.image);
        }
        row.classList.toggle('is-unavailable', !usable);
        row.classList.toggle('is-off', !toggle.checked);
        if (!variant) note.textContent = this.texts.missing || '';
        else if (!variant.available) note.textContent = (item.extra ? this.texts.soldOutPlain : this.texts.soldOut) || '';
        else note.textContent = variant.plan ? this.texts.preorder || '' : '';

        var shown = variant ? this.priceFor(item, variant, bundle && toggle.checked) : 0;
        if (variant) {
          var compare = Math.max(variant.compare, variant.base);
          var html = '<span>' + formatMoney(shown, this.format) + '</span>';
          if (compare > shown) {
            html += ' <s>' + formatMoney(compare, this.format) + '</s>';
          }
          price.innerHTML = html;
        } else {
          price.textContent = '';
        }

        if (usable && toggle.checked) {
          total += shown;
          saving += variant.price - shown;
          count += 1;
        }
      });

      var hint = this.querySelector('[data-bundle-hint]');
      var savingRow = this.querySelector('[data-bundle-saving]');
      if (hint) hint.hidden = bundle;
      if (savingRow) {
        savingRow.hidden = !bundle || saving <= 0;
        savingRow.querySelector('[data-saving]').textContent = '−' + formatMoney(saving, this.format);
      }

      this.querySelector('[data-total]').textContent = formatMoney(total, this.format);
      this.button.disabled = count === 0;
    }

    selected() {
      var lines = [];
      this.querySelectorAll('[data-handle]').forEach((row) => {
        var toggle = row.querySelector('[data-item-toggle]');
        var variant = this.variantFor(row);
        if (!toggle.checked || !variant || !variant.available) return;
        var line = { id: variant.id, quantity: 1, fake: Boolean(variant.fake) };
        if (variant.plan) line.selling_plan = variant.plan;
        lines.push(line);
      });
      return lines;
    }

    add() {
      var lines = this.selected();
      var skipped = lines.some((line) => line.fake);
      lines = lines.filter((line) => !line.fake).map((line) => {
        delete line.fake;
        return line;
      });
      if (!lines.length) {
        this.message.textContent = (skipped ? this.texts.testStock : this.texts.none) || '';
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
          this.message.textContent = (skipped ? this.texts.testStock : this.texts.added) || '';
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
