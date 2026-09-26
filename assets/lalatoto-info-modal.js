/*
 * Lalatoto: modalen «Fortæl mere» på produktsiden.
 *
 * Bygger på det indbyggede <dialog>-element, som selv klarer fokus og Escape.
 * Her lægges resten ovenpå: åbning fra linket, luk ved tryk udenfor, låst
 * scroll på siden bagved, en lukke-animation og indholdsfortegnelsen, der
 * hopper til et afsnit og markerer det afsnit, man er nået til.
 */
(function () {
  if (customElements.get('lalatoto-info-modal')) return;

  var LOCK_CLASS = 'lalatoto-scroll-lock';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class LalatotoInfoModal extends HTMLElement {
    connectedCallback() {
      this.dialog = this.querySelector('dialog');
      if (!this.dialog) return;

      this.scroller = this.dialog.querySelector('[data-lalatoto-scroll]');
      this.links = Array.prototype.slice.call(this.dialog.querySelectorAll('[data-lalatoto-toc] a'));
      this.abort = new AbortController();
      var signal = this.abort.signal;

      /* Linket står i produktinfoen, som Prestige genskaber ved variantskift.
         Derfor lyttes der på hele dokumentet i stedet for på selve knappen. */
      document.addEventListener('click', this.onDocumentClick.bind(this), { signal: signal });

      this.dialog.addEventListener('click', this.onDialogClick.bind(this), { signal: signal });
      this.dialog.addEventListener('cancel', this.onCancel.bind(this), { signal: signal });
      this.dialog.addEventListener('close', this.onClose.bind(this), { signal: signal });

      if (this.scroller) {
        this.scroller.addEventListener('scroll', this.onScroll.bind(this), { passive: true, signal: signal });
      }
    }

    disconnectedCallback() {
      if (this.abort) this.abort.abort();
      document.documentElement.classList.remove(LOCK_CLASS);
    }

    onDocumentClick(event) {
      var opener = event.target.closest('[aria-controls="' + this.dialog.id + '"]');
      if (!opener) return;

      event.preventDefault();
      this.open(opener);
    }

    open(opener) {
      if (this.dialog.open) return;

      this.opener = opener;
      this.scrollY = window.scrollY;
      document.documentElement.classList.add(LOCK_CLASS);
      this.dialog.classList.remove('is-closing');
      this.dialog.showModal();

      if (this.scroller) this.scroller.scrollTop = 0;
      this.markActive();

      var close = this.dialog.querySelector('[data-lalatoto-close]');
      if (close) close.focus({ preventScroll: true });
    }

    close() {
      if (!this.dialog.open || this.dialog.classList.contains('is-closing')) return;

      if (reduceMotion) {
        this.dialog.close();
        return;
      }

      var dialog = this.dialog;
      var done = function () {
        dialog.removeEventListener('animationend', done);
        dialog.classList.remove('is-closing');
        dialog.close();
      };

      dialog.classList.add('is-closing');
      dialog.addEventListener('animationend', done);
      /* Sikkerhedsnet, hvis animationen ikke kører (fx skjult faneblad). */
      setTimeout(function () {
        if (dialog.open) done();
      }, 400);
    }

    onDialogClick(event) {
      if (event.target.closest('[data-lalatoto-close]')) {
        this.close();
        return;
      }

      /* Et tryk på selve <dialog> og ikke på panelet er et tryk udenfor. */
      if (event.target === this.dialog) {
        this.close();
        return;
      }

      var link = event.target.closest('[data-lalatoto-toc] a');
      if (link) {
        var target = this.dialog.querySelector(link.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }

    onCancel(event) {
      /* Escape: brug samme lukke-animation som luk-knappen. */
      event.preventDefault();
      this.close();
    }

    onClose() {
      document.documentElement.classList.remove(LOCK_CLASS);

      /* Siden bagved skal stå, hvor kunden forlod den. */
      if (this.opener && document.contains(this.opener)) this.opener.focus({ preventScroll: true });
      if (typeof this.scrollY === 'number') window.scrollTo(0, this.scrollY);
    }

    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(this.markActive.bind(this));
    }

    markActive() {
      this.ticking = false;
      if (!this.scroller || this.links.length === 0) return;

      var limit = this.scroller.getBoundingClientRect().top + 48;
      var active = this.links[0];

      for (var i = 0; i < this.links.length; i++) {
        var section = this.dialog.querySelector(this.links[i].getAttribute('href'));
        if (section && section.getBoundingClientRect().top <= limit) active = this.links[i];
      }

      /* Nederst i modalen er det sidste afsnit det aktive, også selv om det er kort. */
      if (this.scroller.scrollTop + this.scroller.clientHeight >= this.scroller.scrollHeight - 2) {
        active = this.links[this.links.length - 1];
      }

      for (var j = 0; j < this.links.length; j++) {
        if (this.links[j] === active) this.links[j].setAttribute('aria-current', 'true');
        else this.links[j].removeAttribute('aria-current');
      }
    }
  }

  customElements.define('lalatoto-info-modal', LalatotoInfoModal);
})();
