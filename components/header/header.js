const userToken = localStorage.getItem('token');

const getUser = async (token) => {
    if(token != null) {
        const user = await fetch('http://localhost/softcake/backend/v1/perfil/?acao=get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    
        return await user.json();
    }
    return null;
}

var user;

getUser(userToken).then(userData => {
    user = userData;
    
    customElements.define('main-header', Header);
});

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
                        ${user != null ?
                            `<a href="/usuario/perfil">
                                <img src="${user.foto ?? 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}" alt="${user.nome}" class="foto">
                            </a>` :
                            `<button onclick="window.location='/autenticacao/login'">Login</button>`}
                    </li>
                </ul>
                <a class="background" href="#"></a>
            </div>
        </header>
      `;
    }
}
