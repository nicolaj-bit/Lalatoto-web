/*
 * Lalatoto: produktgalleriet på computer.
 *
 * Billederne står under hinanden. Har produktet flere end fire billeder,
 * står de tre første fast, og plads nummer fire bliver et lille slideshow
 * med resten: prikker og pile under billedet skifter mellem dem. Så skal
 * man ikke rulle så langt for at komme forbi billederne.
 *
 * Billederne skjules med en klasse og ikke med hidden, så Prestiges
 * karrusel (telefon) og filtrering af billeder pr. farve ikke påvirkes.
 * Når farven skiftes, flyttes billederne om (se lalatotoPromoteMedia i
 * theme.js), og så tegnes slideshowet forfra.
 */
(function () {
  var FIXED = 3;
  var wide = window.matchMedia('(min-width: 1000px)');
  var lang = (document.documentElement.lang || 'da').slice(0, 2);
  var STRINGS = {
    da: { group: 'Flere billeder', show: 'Vis billede', prev: 'Forrige billede', next: 'Næste billede' },
    en: { group: 'More images', show: 'Show image', prev: 'Previous image', next: 'Next image' },
    de: { group: 'Weitere Bilder', show: 'Bild anzeigen', prev: 'Vorheriges Bild', next: 'Nächstes Bild' }
  };
  var t = STRINGS[lang] || STRINGS.da;

  function setup(gallery) {
    var carousel = gallery.querySelector('.product-gallery__carousel');
    if (!carousel || gallery.dataset.lalatotoSlides === '1') return;
    gallery.dataset.lalatotoSlides = '1';

    var nav = document.createElement('div');
    nav.className = 'lalatoto-gallery-nav';
    nav.setAttribute('role', 'group');
    nav.setAttribute('aria-label', t.group);
    nav.hidden = true;
    carousel.insertAdjacentElement('afterend', nav);

    var active = 0;
    var extras = [];

    function cells() {
      return Array.prototype.filter.call(carousel.children, function (cell) {
        return cell.classList.contains('product-gallery__media') && !cell.hidden;
      });
    }

    function show(index, animate) {
      if (extras.length === 0) return;
      active = (index + extras.length) % extras.length;
      extras.forEach(function (cell, i) {
        cell.classList.toggle('lalatoto-gallery-off', i !== active);
        cell.classList.toggle('lalatoto-gallery-in', animate && i === active);
      });
      Array.prototype.forEach.call(nav.querySelectorAll('.lalatoto-gallery-nav__dot'), function (dot, i) {
        dot.setAttribute('aria-current', i === active ? 'true' : 'false');
      });
    }

    function render() {
      var list = cells();
      list.forEach(function (cell) {
        cell.classList.remove('lalatoto-gallery-off', 'lalatoto-gallery-slide', 'lalatoto-gallery-in');
      });
      extras = [];

      if (!wide.matches || carousel.isScrollable || list.length <= FIXED + 1) {
        nav.hidden = true;
        nav.innerHTML = '';
        return;
      }

      extras = list.slice(FIXED);
      extras.forEach(function (cell) {
        cell.classList.add('lalatoto-gallery-slide');
      });
      if (active >= extras.length) active = 0;

      var html = '<button type="button" class="lalatoto-gallery-nav__arrow" data-step="-1" aria-label="' + t.prev + '">‹</button>';
      extras.forEach(function (cell, i) {
        html +=
          '<button type="button" class="lalatoto-gallery-nav__dot" data-index="' + i + '" aria-label="' +
          t.show + ' ' + (FIXED + i + 1) + '"></button>';
      });
      html += '<button type="button" class="lalatoto-gallery-nav__arrow" data-step="1" aria-label="' + t.next + '">›</button>';
      nav.innerHTML = html;
      nav.hidden = false;
      show(active, false);
    }

    nav.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.step) show(active + parseInt(button.dataset.step, 10), true);
      else show(parseInt(button.dataset.index, 10), true);
    });

    /* Farveskift flytter billederne rundt eller skjuler nogle: tegn forfra */
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        active = 0;
        render();
      });
    }).observe(carousel, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

    wide.addEventListener('change', render);
    render();
  }

  function init() {
    document.querySelectorAll('product-gallery').forEach(setup);
  }

  Promise.all([customElements.whenDefined('product-gallery'), customElements.whenDefined('scroll-carousel')]).then(init);
  document.addEventListener('shopify:section:load', init);
})();
