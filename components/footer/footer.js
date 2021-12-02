class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer>
            
        </footer>
      `;
    }
}

customElements.define('main-footer', Footer);