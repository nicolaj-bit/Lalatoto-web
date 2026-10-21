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

/*
 * Lalatoto: forventet levering på produktsiden (Danmark).
 *
 * <lalatoto-delivery-date> skriver «Bestil inden kl. 10, så sender vi i dag.
 * Forventet hos dig torsdag 23. oktober.» ud fra klokken i Danmark. Bestilt
 * før kl. 10 på en hverdag sendes varen samme dag, ellers næste hverdag, og
 * den er hos kunden hverdagen efter afsendelse. Helligdage regnes ikke med.
 * Elementet regner selv, hver gang det sættes ind, så det også virker efter
 * et variantskift, hvor blokken udskiftes.
 */
(function () {
  if (!window.customElements || customElements.get('lalatoto-delivery-date')) return;

  function danishNow() {
    /* Dato og klokkeslæt i Danmark, uanset hvor kunden sidder */
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Copenhagen',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (type) {
      return Number(parts.find(function (part) { return part.type === type; }).value);
    };
    return { date: new Date(Date.UTC(get('year'), get('month') - 1, get('day'))), hour: get('hour') };
  }

  function isWeekday(date) {
    var day = date.getUTCDay();
    return day !== 0 && day !== 6;
  }

  function nextWeekday(date) {
    var next = new Date(date.getTime());
    do {
      next.setUTCDate(next.getUTCDate() + 1);
    } while (!isWeekday(next));
    return next;
  }

  customElements.define(
    'lalatoto-delivery-date',
    class extends HTMLElement {
      connectedCallback() {
        try {
          var cutoff = Number(this.dataset.cutoff || 10);
          var locale = this.dataset.locale || 'da-DK';
          var now = danishNow();
          var shipsToday = isWeekday(now.date) && now.hour < cutoff;
          var ship = shipsToday ? now.date : nextWeekday(now.date);
          var arrival = nextWeekday(ship);

          var format = function (date, options) {
            return new Intl.DateTimeFormat(locale, Object.assign({ timeZone: 'UTC' }, options)).format(date);
          };
          var arrivalText = format(arrival, { weekday: 'long', day: 'numeric', month: 'long' });
          var text;

          if (shipsToday) {
            text = (this.dataset.before || '')
              .replace('{time}', String(cutoff).padStart(2, '0') + (locale.indexOf('da') === 0 ? '' : ':00'))
              .replace('{date}', arrivalText);
          } else {
            var tomorrow = new Date(now.date.getTime());
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            var shipText =
              ship.getTime() === tomorrow.getTime() ? this.dataset.tomorrow : format(ship, { weekday: 'long' });
            text = (this.dataset.after || '').replace('{ship}', shipText).replace('{date}', arrivalText);
          }

          if (text) this.textContent = text;
        } catch (error) {
          /* Standardteksten bliver stående */
        }
      }
    }
  );
})();
