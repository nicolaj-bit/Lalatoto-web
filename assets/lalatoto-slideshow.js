/*
 * Lalatoto: slideshow på forsiden (sections/lalatoto-slideshow.liquid).
 *
 * Slides toner over i hinanden. Stregerne nederst viser, hvor man er, og
 * kan klikkes. På telefon kan man swipe. Skifter selv, hvis data-autoplay er
 * sat, men holder pause, mens musen er over, når fanen ikke er synlig, og
 * når brugeren har bedt om mindre bevægelse.
 */
(function () {
  if (customElements.get('lalatoto-slideshow')) return;

  class LalatotoSlideshow extends HTMLElement {
    connectedCallback() {
      this.slides = Array.from(this.querySelectorAll('.lalatoto-slideshow__slide'));
      this.dots = Array.from(this.querySelectorAll('.lalatoto-slideshow__dot'));
      this.index = 0;
      if (this.slides.length < 2) return;

      this.seconds = parseInt(this.dataset.autoplay, 10) || 0;
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => this.go(parseInt(dot.dataset.index, 10), true));
      });

      this.addEventListener('mouseenter', () => this.pause());
      this.addEventListener('mouseleave', () => this.play());
      this.addEventListener('focusin', () => this.pause());
      this.addEventListener('focusout', () => this.play());
      document.addEventListener('visibilitychange', () => (document.hidden ? this.pause() : this.play()));

      /* Swipe */
      let startX = null;
      this.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      this.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) > 40) this.go(this.index + (dx < 0 ? 1 : -1), true);
      });

      /* Temaeditoren: vis det slide, der er valgt */
      this.addEventListener('shopify:block:select', (e) => {
        const i = this.slides.indexOf(e.target);
        if (i > -1) { this.go(i); this.pause(); }
      });
      this.addEventListener('shopify:block:deselect', () => this.play());

      this.play();
    }

    disconnectedCallback() {
      this.pause();
    }

    go(i, byUser) {
      const n = this.slides.length;
      const next = ((i % n) + n) % n;
      if (next === this.index) return;
      this.slides.forEach((slide, k) => {
        const on = k === next;
        slide.classList.toggle('is-active', on);
        slide.toggleAttribute('inert', !on);
        if (on) slide.removeAttribute('aria-hidden'); else slide.setAttribute('aria-hidden', 'true');
      });
      this.dots.forEach((dot, k) => {
        const on = k === next;
        dot.classList.toggle('is-active', on);
        if (on) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
      });
      this.index = next;
      if (byUser) { this.pause(); this.play(); }
    }

    play() {
      if (!this.seconds || this.reduced || this.timer) return;
      this.classList.add('is-playing');
      this.timer = setInterval(() => this.go(this.index + 1), this.seconds * 1000);
    }

    pause() {
      this.classList.remove('is-playing');
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  customElements.define('lalatoto-slideshow', LalatotoSlideshow);
})();
