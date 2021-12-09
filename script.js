
import { obterBolos, carregarUtilitarios } from './utils/bolo.js';

const items = document.querySelectorAll(".item-pergunta button");

const checarAdmin = async () => {
  if(localStorage.getItem('token') != null) {
    return fetch('http://localhost/softcake/backend/v1/perfil/?acao=get', {
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
  obterBolos(usuarioEAdmin);
  carregarUtilitarios(usuarioEAdmin);
});

function toggleFAQ() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  items.forEach(item => item.setAttribute('aria-expanded', 'false'))
  
  if (itemToggle == 'false') this.setAttribute('aria-expanded', 'true');
}

items.forEach(item => item.addEventListener('click', toggleFAQ));