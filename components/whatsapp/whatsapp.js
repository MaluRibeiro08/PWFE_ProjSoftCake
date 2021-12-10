class WhatsappButton extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <a
          href="https://api.whatsapp.com/send?phone=551198989898"
          class="whatsapp-button"
          target="_blank">
            <i class="fab fa-whatsapp whatsapp-icon"></i>
        </a>
      `;
    }
}

customElements.define('whatsapp-button', WhatsappButton);
