/*
 * Lalatoto: «Begge» på produktsiden (snippets/lalatoto-both-option.liquid).
 *
 * «Begge» er ikke en rigtig variant. Vælges det:
 *   - prisen øverst viser den samlede pris med rabat, normalprisen overstreget
 *     og «Spar 20 %»
 *   - knappen hedder «Læg begge i kurv» og lægger begge varianter i kurven
 *     hver for sig, så lager og ordrer er som altid. Rabatten gives af en
 *     automatisk rabat i Shopify.
 *
 * Vælger kunden en størrelse igen, stilles alt tilbage. Skifter størrelsen,
 * genindlæser temaet selv pris, knap og varianter, så «Begge» er fravalgt.
 */
(function () {
  if (window.lalatotoBothReady) return;
  window.lalatotoBothReady = true;

  function parts(both) {
    var form = document.getElementById(both.getAttribute('data-form'));
    var info = both.closest('.product-info') || document;
    return {
      form: form,
      values: both.closest('.variant-picker__option-values'),
      price: info.querySelector('[data-block-type="price"] price-list'),
      button: form ? form.querySelector('button[type="submit"]') : null
    };
  }

  function activeIn(form) {
    /* getAttribute: form.id er formularens felt name="id", ikke dens id */
    var id = form && form.getAttribute ? form.getAttribute('id') : null;
    if (!id) return null;
    return document.querySelector('[data-lalatoto-both][aria-pressed="true"][data-form="' + CSS.escape(id) + '"]');
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function priceLine(both) {
    var fragment = document.createDocumentFragment();
    var sale = el('sale-price', 'h4 text-subdued');
    sale.append(el('span', 'sr-only', both.getAttribute('data-label-sale')), both.getAttribute('data-price'));
    var compare = el('compare-at-price', 'h5 text-subdued line-through');
    compare.append(el('span', 'sr-only', both.getAttribute('data-label-regular')), both.getAttribute('data-compare'));
    fragment.append(sale, compare, el('span', 'lalatoto-both__save', both.getAttribute('data-save')));
    return fragment;
  }

  function select(both) {
    var p = parts(both);
    if (!p.form) return;
    both.setAttribute('aria-pressed', 'true');
    both.classList.add('is-selected');
    if (p.values) p.values.classList.add('is-both');
    if (p.price) {
      if (!p.price.lalatotoOriginal) p.price.lalatotoOriginal = Array.from(p.price.childNodes);
      p.price.replaceChildren(priceLine(both));
    }
    if (p.button) {
      if (p.button.lalatotoOriginal == null) p.button.lalatotoOriginal = p.button.textContent;
      p.button.textContent = both.getAttribute('data-add');
    }
  }

  function unselect(both) {
    var p = parts(both);
    both.setAttribute('aria-pressed', 'false');
    both.classList.remove('is-selected');
    if (p.values) p.values.classList.remove('is-both');
    if (p.price && p.price.lalatotoOriginal) {
      p.price.replaceChildren.apply(p.price, p.price.lalatotoOriginal);
      p.price.lalatotoOriginal = null;
    }
    if (p.button && p.button.lalatotoOriginal != null) {
      p.button.textContent = p.button.lalatotoOriginal;
      p.button.lalatotoOriginal = null;
    }
    clearError(p.form);
  }

  function clearError(form) {
    var old = form && form.querySelector('.lalatoto-both__error');
    if (old) old.remove();
  }

  function showError(form, button, text) {
    clearError(form);
    var message = el('p', 'lalatoto-both__error', text);
    message.setAttribute('role', 'alert');
    (button && button.parentElement ? button.parentElement : form).append(message);
  }

  document.addEventListener('click', function (event) {
    var both = event.target.closest('[data-lalatoto-both]');
    if (both) {
      event.preventDefault();
      if (both.getAttribute('aria-pressed') !== 'true') select(both);
      return;
    }
    /* Et klik på en størrelse fravælger «Begge», også den der allerede er valgt */
    var label = event.target.closest('.variant-picker__option-values.is-both label');
    if (label) {
      var active = label.closest('.variant-picker__option-values').querySelector('[data-lalatoto-both]');
      if (active) unselect(active);
    }
  });

  /* Køres før temaets egen håndtering af formularen (capture på document) */
  document.addEventListener(
    'submit',
    function (event) {
      var form = event.target;
      var both = activeIn(form);
      if (!both) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      var button = parts(both).button;
      if (button && button.getAttribute('aria-busy') === 'true') return;
      if (button) button.setAttribute('aria-busy', 'true');
      clearError(form);

      var items = both
        .getAttribute('data-variants')
        .split(',')
        .map(function (id) {
          return { id: Number(id), quantity: 1 };
        });
      var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';

      fetch(root + 'cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: items })
      })
        .then(function (response) {
          if (!response.ok) throw new Error('cart');
          document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
          var drawer = document.querySelector('cart-drawer');
          if (drawer && typeof drawer.show === 'function') {
            drawer.show();
          } else {
            window.location.href = root + 'cart';
          }
        })
        .catch(function () {
          showError(form, button, both.getAttribute('data-error'));
        })
        .finally(function () {
          if (button) button.removeAttribute('aria-busy');
        });
    },
    true
  );
})();
