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
})();
