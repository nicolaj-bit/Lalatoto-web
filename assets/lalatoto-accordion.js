/*
 * Lalatoto: liste med punkter, der folder sig ud (<details>). Kun ét punkt
 * er åbent ad gangen, og teksten folder blødt ud og ind (ca. 0,28 sek.).
 * For dem, der har slået bevægelse fra, sker det samme uden animation.
 *
 * Bruges af FAQ'en under produkterne: <div data-lalatoto-accordion> med
 * .lalatoto-wash__item-punkter, samme markup og udseende som
 * vaskevejledningen.
 */
(function () {
  var DURATION = 280;
  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function setup(root) {
    if (root.dataset.accordionReady === '1') return;
    root.dataset.accordionReady = '1';

    var items = Array.prototype.slice.call(root.querySelectorAll('.lalatoto-wash__item'));

    function body(item) {
      return item.querySelector('.lalatoto-wash__body');
    }

    function currentHeight(item) {
      return item.animation ? body(item).getBoundingClientRect().height : null;
    }

    function close(item) {
      if (!item.open || item.classList.contains('is-closing')) return;
      var from = currentHeight(item);
      if (item.animation) item.animation.cancel();

      if ((reduce && reduce.matches) || !body(item).animate) {
        item.open = false;
        return;
      }

      item.classList.remove('is-opening');
      item.classList.add('is-closing');
      item.animation = body(item).animate(
        [{ height: (from === null ? body(item).offsetHeight : from) + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: DURATION, easing: 'ease' }
      );
      item.animation.onfinish = function () {
        item.classList.remove('is-closing');
        item.animation = null;
        item.open = false;
      };
      item.animation.oncancel = function () {
        item.classList.remove('is-closing');
      };
    }

    function open(item) {
      items.forEach(function (other) {
        if (other !== item) close(other);
      });

      var from = currentHeight(item);
      if (item.animation) item.animation.cancel();
      item.classList.remove('is-closing');
      item.open = true;

      if ((reduce && reduce.matches) || !body(item).animate) return;

      item.classList.add('is-opening');
      var height = body(item).offsetHeight;
      item.animation = body(item).animate(
        [{ height: (from === null ? 0 : from) + 'px', opacity: 0 }, { height: height + 'px', opacity: 1 }],
        { duration: DURATION, easing: 'ease' }
      );
      item.animation.onfinish = item.animation.oncancel = function () {
        item.classList.remove('is-opening');
        item.animation = null;
      };
    }

    items.forEach(function (item) {
      /* name-attributten ville lukke de andre uden animation; scriptet står selv for det */
      item.removeAttribute('name');
      item.querySelector('summary').addEventListener('click', function (event) {
        event.preventDefault();
        if (item.open && !item.classList.contains('is-closing')) close(item);
        else open(item);
      });
    });
  }

  function init() {
    document.querySelectorAll('[data-lalatoto-accordion]').forEach(setup);
  }

  init();
  document.addEventListener('shopify:section:load', init);
})();
