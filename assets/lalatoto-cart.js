/*
 * Lalatoto: kurven (cart drawer).
 *
 * 1. Forslag (<lalatoto-cart-upsell>): vælger produkter, der passer til
 *    kurven, i denne rækkefølge:
 *      a. produkter valgt i temaeditoren,
 *      b. Shopifys «passer godt til» (complementary) for produkterne i kurven,
 *      c. Shopifys «lignende» (related) for de samme produkter,
 *      d. produkter, kunden senest har kigget på (gemt af produktsiden).
 *    Kortene hentes som færdig HTML fra sektionen lalatoto-cart-upsell, så
 *    pris, sprog og tilføj-knap følger temaet. Intet, der allerede ligger i
 *    kurven, vises. Resultatet huskes, så kurven ikke blinker, når den
 *    genindlæses efter fx et ændret antal.
 *
 * 2. Handelsbetingelser (<lalatoto-terms>): betalingen går ikke videre, før
 *    feltet er sat. Valget huskes i fanen, mens kurven genindlæses.
 *
 * 3. Rabatkode: Enter og «Anvend» lægger koden på kurven i stedet for at
 *    sende formularen videre til betaling.
 */
(function () {
  if (window.lalatotoCartReady) return;
  window.lalatotoCartReady = true;

  var SECTION = 'lalatoto-cart-upsell';
  var TERMS_KEY = 'lalatoto:terms-accepted';
  var cache = {};

  function root() {
    return (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  }

  function ids(value) {
    return (value || '')
      .split(',')
      .map(function (id) {
        return id.trim();
      })
      .filter(Boolean);
  }

  function recentlyViewed() {
    try {
      return (JSON.parse(localStorage.getItem('theme:recently-viewed-products') || '[]') || []).map(String);
    } catch (error) {
      return [];
    }
  }

  function fetchCards(url) {
    return fetch(url, { credentials: 'same-origin' })
      .then(function (response) {
        return response.ok ? response.text() : '';
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return Array.prototype.slice.call(doc.querySelectorAll('[data-lalatoto-upsell-item]'));
      })
      .catch(function () {
        return [];
      });
  }

  function byIds(list) {
    if (list.length === 0) return Promise.resolve([]);
    var query = list
      .map(function (id) {
        return 'id:' + id;
      })
      .join(' OR ');
    var url =
      root() + 'search?type=product&options%5Bprefix%5D=none&q=' + encodeURIComponent(query) + '&section_id=' + SECTION;
    return fetchCards(url).then(function (cards) {
      /* Søgningen sorterer selv; her lægges kortene i den ønskede rækkefølge */
      return cards.sort(function (a, b) {
        return list.indexOf(a.dataset.productId) - list.indexOf(b.dataset.productId);
      });
    });
  }

  function recommendations(productId, intent) {
    var url =
      root() +
      'recommendations/products?product_id=' +
      encodeURIComponent(productId) +
      '&limit=8&intent=' +
      intent +
      '&section_id=' +
      SECTION;
    return fetchCards(url);
  }

  class LalatotoCartUpsell extends HTMLElement {
    connectedCallback() {
      this.list = this.querySelector('.lalatoto-upsell__list');
      this.inCart = ids(this.dataset.cartIds);
      this.manual = ids(this.dataset.manualIds);
      this.limit = parseInt(this.dataset.limit, 10) || 3;
      this.key = this.inCart.join(',') + '|' + this.manual.join(',') + '|' + this.limit;

      if (cache[this.key]) {
        this.render(cache[this.key]);
      } else {
        this.load();
      }
    }

    async load() {
      var key = this.key;
      var inCart = this.inCart;
      var limit = this.limit;
      var found = [];
      var seen = {};

      function take(cards) {
        cards.forEach(function (card) {
          var id = card.dataset.productId;
          if (found.length >= limit || seen[id] || inCart.indexOf(id) !== -1) return;
          seen[id] = true;
          found.push(card.outerHTML);
        });
      }

      take(await byIds(this.manual));

      var steps = [];
      inCart.slice(0, 3).forEach(function (id) {
        steps.push([id, 'complementary']);
      });
      inCart.slice(0, 3).forEach(function (id) {
        steps.push([id, 'related']);
      });

      for (var i = 0; i < steps.length && found.length < limit; i++) {
        take(await recommendations(steps[i][0], steps[i][1]));
      }

      if (found.length < limit) {
        var recent = recentlyViewed()
          .filter(function (id) {
            return inCart.indexOf(id) === -1 && !seen[id];
          })
          .slice(0, 8);
        take(await byIds(recent));
      }

      cache[key] = found;
      /* Kurven kan være genindlæst imens; så er dette element ikke længere på siden */
      if (this.isConnected) this.render(found);
    }

    render(cards) {
      if (!this.list) return;
      this.list.innerHTML = cards.join('');
      this.hidden = cards.length === 0;
    }
  }

  if (!customElements.get('lalatoto-cart-upsell')) {
    customElements.define('lalatoto-cart-upsell', LalatotoCartUpsell);
  }

  class LalatotoTerms extends HTMLElement {
    connectedCallback() {
      this.checkbox = this.querySelector('[data-lalatoto-terms]');
      this.error = this.querySelector('.lalatoto-terms__error');
      if (!this.checkbox) return;

      try {
        this.checkbox.checked = sessionStorage.getItem(TERMS_KEY) === '1';
      } catch (error) {
        /* Uden sessionStorage starter feltet blot tomt */
      }

      this.checkbox.addEventListener('change', this.onChange.bind(this));
    }

    onChange() {
      try {
        sessionStorage.setItem(TERMS_KEY, this.checkbox.checked ? '1' : '0');
      } catch (error) {
        /* ignorer */
      }
      if (this.checkbox.checked) this.showError(false);
    }

    showError(show) {
      if (this.error) this.error.hidden = !show;
      this.classList.toggle('has-error', show);
    }
  }

  if (!customElements.get('lalatoto-terms')) {
    customElements.define('lalatoto-terms', LalatotoTerms);
  }

  /* Betaling: stop, hvis handelsbetingelserne ikke er accepteret */
  document.addEventListener(
    'submit',
    function (event) {
      var form = event.target;
      var terms = form.querySelector && form.querySelector('lalatoto-terms');
      if (!terms || !terms.checkbox || terms.checkbox.checked) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      terms.showError(true);
      terms.checkbox.focus();
    },
    true
  );

  /* Rabatkode: Enter og «Anvend» lægger koden på i stedet for at gå til betaling */
  document.addEventListener(
    'keydown',
    function (event) {
      var input = event.target.closest && event.target.closest('[data-lalatoto-discount-input]');
      if (!input || event.key !== 'Enter') return;
      event.preventDefault();
      input.blur();
    },
    true
  );

  /* Husk den kode, der senest blev sendt, så «Anvend» ikke sender den to gange
     (klikket får først feltet til at miste fokus, hvilket selv sender koden) */
  document.addEventListener(
    'change',
    function (event) {
      if (event.target.matches && event.target.matches('[data-lalatoto-discount-input]')) {
        event.target.dataset.sent = event.target.value;
      }
    },
    true
  );

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-lalatoto-discount-apply]');
    if (!button) return;
    var field = button.closest('cart-discount-field');
    var input = field && field.querySelector('[data-lalatoto-discount-input]');
    if (!input || input.value.trim() === '') {
      if (input) input.focus();
      return;
    }
    if (input.dataset.sent === input.value) return;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
})();
