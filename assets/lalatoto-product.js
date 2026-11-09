/*
 * Lalatoto: produktsiden.
 *
 * 1. Når kunden skifter variant, genindlæser Prestige kun sine egne blokke
 *    (pris, varianter, Læg i kurv osv.). Vores blokke afhænger også af den
 *    valgte variant: ventelisten vises kun for en udsolgt variant, og
 *    leveringstiden kun for en variant på lager. Her skiftes de ud med de
 *    friske udgaver fra samme svar, som Prestige selv bruger.
 *
 * 2. Nyhedsbrev-fluebenet i ventelisten tilføjer mærket «nyhedsbrev-samtykke».
 *    Lytteren sidder på hele siden, så den også virker for en venteliste, der
 *    først kommer frem efter et variantskift.
 */
(function () {
  if (window.lalatotoProductReady) return;
  window.lalatotoProductReady = true;

  var BLOCK_TYPES = ['lalatoto-waitlist', 'lalatoto-delivery'];

  function findIn(fragment, selector) {
    if (!fragment) return null;
    if (fragment.querySelector) {
      var found = fragment.querySelector(selector);
      if (found) return found;
    }
    /* Prestige kan levere svaret som <template>, hvis indhold ligger i .content */
    var templates = fragment.querySelectorAll ? fragment.querySelectorAll('template') : [];
    for (var i = 0; i < templates.length; i++) {
      var inner = findIn(templates[i].content, selector);
      if (inner) return inner;
    }
    return null;
  }

  function watch(rerender) {
    var form = document.forms[rerender.getAttribute('observe-form')];
    if (!form || rerender.lalatotoWatching) return;
    rerender.lalatotoWatching = true;

    form.addEventListener('product:rerender', function (event) {
      var detail = event.detail || {};

      /* Ved produktskift eller fuld genindlæsning udskifter Prestige det hele selv */
      if (!rerender.hasAttribute('allow-partial-rerender') || detail.productChange) return;

      var current = document.getElementById(rerender.id);
      var fresh = findIn(detail.htmlFragment, '#' + CSS.escape(rerender.id));
      if (!current || !fresh) return;

      BLOCK_TYPES.forEach(function (type) {
        current.querySelectorAll('[data-block-type="' + type + '"]').forEach(function (element) {
          var match = fresh.querySelector(
            '[data-block-type="' + type + '"][data-block-id="' + element.getAttribute('data-block-id') + '"]'
          );
          if (match) element.replaceWith(document.importNode(match, true));
        });
      });
    });
  }

  function init() {
    document.querySelectorAll('product-rerender[observe-form]').forEach(watch);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('change', function (event) {
    var box = event.target.closest && event.target.closest('[data-lalatoto-newsletter]');
    if (!box) return;
    var tags = box.form && box.form.querySelector('input[name="contact[tags]"]');
    if (!tags) return;
    var base = tags.getAttribute('data-base-tags');
    tags.value = box.checked ? base + ',nyhedsbrev-samtykke' : base;
  });

  /*
   * Ventelisten sendes til Base44-funktionen waitlistSignup i stedet for
   * Shopifys kundeformular. Shopifys formular tilmelder altid kunden
   * nyhedsbrevet; funktionen gør det kun ved flueben og danner selv tags ud
   * fra varianten. Fejler kaldet, vises fejlbeskeden, og intet sendes videre.
   */
  var WAITLIST_APP_ID = '6ad0540094b2b23633a4f532';
  var WAITLIST_ENDPOINT =
    'https://lala-order-flow.base44.app/api/apps/' + WAITLIST_APP_ID + '/functions/waitlistSignup';

  function waitlistError(form, show) {
    var field = form.querySelector('.lalatoto-waitlist__field');
    var error = form.querySelector('.lalatoto-waitlist__error');
    if (!error && show) {
      error = document.createElement('p');
      error.className = 'lalatoto-waitlist__error';
      error.setAttribute('role', 'alert');
      var source = form.querySelector('input[name="lalatoto_variant"]');
      error.textContent = (source && source.getAttribute('data-error')) || '';
      field.insertAdjacentElement('afterend', error);
    }
    if (error) error.hidden = !show;
    if (field) field.classList.toggle('has-error', show);
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form.matches || !form.matches('.lalatoto-waitlist__form')) return;
    var variant = form.querySelector('input[name="lalatoto_variant"]');
    if (!variant || !window.fetch) return;
    event.preventDefault();

    var email = form.querySelector('input[name="contact[email]"]');
    if (email && !email.checkValidity()) {
      email.reportValidity();
      return;
    }

    var box = form.querySelector('[data-lalatoto-newsletter]');
    var trap = form.querySelector('input[name="company"]');
    var button = form.querySelector('.lalatoto-waitlist__submit');
    if (button) button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    waitlistError(form, false);

    fetch(WAITLIST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Id': WAITLIST_APP_ID },
      body: JSON.stringify({
        email: email ? email.value : '',
        variantId: variant.value,
        newsletter: !!(box && box.checked),
        company: trap ? trap.value : ''
      })
    })
      .then(function (response) {
        return response.json().then(
          function (body) { return response.ok && body && body.ok === true; },
          function () { return false; }
        );
      })
      .catch(function () { return false; })
      .then(function (ok) {
        if (button) button.disabled = false;
        form.removeAttribute('aria-busy');
        if (!ok) {
          waitlistError(form, true);
          return;
        }
        var state = form.querySelector('.lalatoto-waitlist__state');
        if (state) state.classList.add('is-done');
      });
  });
})();
