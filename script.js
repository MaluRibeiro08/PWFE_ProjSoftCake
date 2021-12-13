
import { obterBolos, carregarUtilitarios } from './utils/bolo.js';

const items = document.querySelectorAll(".item-pergunta button");

const checarAdmin = async () => {
  if(localStorage.getItem('token') != null) {
    return fetch('http://localhost/softcake/backend/v1/perfil/token/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => response.json()).then(user => {
      if(user.isAdmin == "1") return true;
      else return false;
    });
  } else {
    return false;
  }
}

checarAdmin().then(usuarioEAdmin => { 
  const inputPesquisa = document.querySelector('.pesquisa input');
  const botaoPesquisa = document.querySelector('.botao-pesquisa');

  console.log(inputPesquisa.value);

  const filtrarPesquisa = () => {
    if(inputPesquisa.value == '') {
      obterBolos(usuarioEAdmin);
    } else if(inputPesquisa.value.length > 3) {
      obterBolos(usuarioEAdmin, inputPesquisa.value);
    }
  }

  botaoPesquisa.addEventListener('click', filtrarPesquisa)
  inputPesquisa.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
      filtrarPesquisa();
    }
  });
  obterBolos(usuarioEAdmin);
  carregarUtilitarios(usuarioEAdmin);

  const botaoAdicionarBolo = document.querySelector("#catalogo header .adicionar-bolo");
  botaoAdicionarBolo.innerHTML = '<i class="fas fa-plus"></i> Adicionar bolo';
  botaoAdicionarBolo.addEventListener('click', () => {
    window.location.href = '/produto/cadastro';
  });
});

const toggleFAQ = () => {
  const itemToggle = this.getAttribute('aria-expanded');
  
  items.forEach(item => item.setAttribute('aria-expanded', 'false'))
  
  if (itemToggle == 'false') this.setAttribute('aria-expanded', 'true');
}

items.forEach(item => item.addEventListener('click', toggleFAQ));
