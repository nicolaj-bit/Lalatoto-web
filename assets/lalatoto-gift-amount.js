/*
 * Lalatoto: gavekortets beløbsvælger (snippets/lalatoto-gift-amount.liquid).
 *
 * Kunden trykker på et hurtigt beløb eller skriver sit eget. Findes beløbet
 * som variant, sættes formularens variant, og prisen øverst skifter. Ellers
 * kan gavekortet ikke lægges i kurven, og teksten under feltet bliver rød.
 */
(function () {
  if (customElements.get('lalatoto-gift-amount')) return;

  function formatKr(kr) {
    return kr.toLocaleString('da-DK') + ' kr';
  }

  class LalatotoGiftAmount extends HTMLElement {
    connectedCallback() {
      var data = this.querySelector('script[data-variants]');
      try {
        this.variants = JSON.parse(data ? data.textContent : '{}');
      } catch (e) {
        this.variants = {};
      }
      this.step = Number(this.dataset.step) || 50;
      this.min = Number(this.dataset.min) || 0;
      this.max = Number(this.dataset.max) || Infinity;
      this.input = this.querySelector('.lalatoto-gift__input');
      this.hint = this.querySelector('.lalatoto-gift__hint');
      this.chips = Array.from(this.querySelectorAll('.lalatoto-gift__chip'));

      this.chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          this.input.value = chip.dataset.amount;
          this.update();
        });
      });
      this.input.addEventListener('input', () => this.update());
      this.input.addEventListener('blur', () => {
        var kr = this.amount();
        if (kr) this.input.value = String(kr);
      });

      this.update();
    }

    /* «1.250», «1250 kr» og «1 250» læses alle som 1250 */
    amount() {
      var digits = this.input.value.replace(/[^0-9]/g, '');
      return digits ? Number(digits) : 0;
    }

    form() {
      return document.getElementById(this.dataset.form);
    }

    update() {
      var kr = this.amount();
      var id = kr % this.step === 0 && kr >= this.min && kr <= this.max ? this.variants[String(kr)] : null;
      var form = this.form();
      var idInput = form ? form.querySelector('input[name="id"]') : null;
      var submit = form ? form.querySelector('button[type="submit"]') : null;

      this.chips.forEach((chip) => {
        chip.setAttribute('aria-pressed', Number(chip.dataset.amount) === kr ? 'true' : 'false');
      });

      var invalid = Boolean(this.input.value.trim()) && !id;
      this.hint.classList.toggle('is-error', invalid);
      this.input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      if (submit) submit.disabled = !id;
      if (!id) return;

      if (idInput) idInput.value = id;
      var info = this.closest('.product-info') || document;
      var price = info.querySelector('[data-block-type="price"] sale-price');
      if (price) {
        var label = price.querySelector('.sr-only');
        price.replaceChildren();
        if (label) price.append(label);
        price.append(formatKr(kr));
      }
    }
  }

  customElements.define('lalatoto-gift-amount', LalatotoGiftAmount);
})();
