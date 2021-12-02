class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
            <a href="#navbar">
                <i class="fas fa-bars"></i>
            </a>
            <a href="/" class="logo">
                <img src="/public/images/logo.svg" alt="Soft Cake">
            </a>
            <div id="navbar">
                <ul>
                    <li><a href="/">Catálogo</a></li>
                    <li><a href="/sobre-nos">Sobre nós</a></li>
                    <li class="logo">
                        <a href="/">
                            <img src="/public/images/logo.svg" alt="Soft Cake">
                        </a>
                    </li>
                    <li><a href="/unidades">Unidades</a></li>
                    <li>
                        <?php if(isset($_SESSION['']))  {?>
                            
                        <?php } else { ?>
                            <button onclick="window.location='/autenticacao/login'">Login</button>
                        <?php } ?>
                    </li>
                </ul>
                <a class="background" href="#"></a>
            </div>
        </header>
      `;
    }
}

customElements.define('main-header', Header);