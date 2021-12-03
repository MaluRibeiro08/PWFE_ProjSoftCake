const items = document.querySelectorAll(".item-pergunta button");

function toggleFAQ() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  items.forEach(item => item.setAttribute('aria-expanded', 'false'))
  
  if (itemToggle == 'false') this.setAttribute('aria-expanded', 'true');
}

items.forEach(item => item.addEventListener('click', toggleFAQ));

fetch('http://localhost/softcake/backend/v1/bolo/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.json()).then(produtos => { 
  const divProdutos = document.querySelector('.produtos');

  produtos.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('card-produto');
    div.innerHTML = `
      <img src="https://images.unsplash.com/photo-1614174486496-344ef3e9d870?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="Bolo de chocolate">
      <div class="informacoes">
          <div class="titulo">
              <h4>${produto.nomeCard}</h4>
              <h5>R$${produto.precoPorQuilo}</h5>
          </div>
          <div class="estrelas">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
          </div>
          <button onclick="window.location.href='/produto?id=${produto.idBolo}'">
              <i class="fas fa-shopping-cart"></i>
          </button>
      </div>
    `;
    divProdutos.appendChild(div);
  });
});