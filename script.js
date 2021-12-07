const items = document.querySelectorAll(".item-pergunta button");

var produtos;

function toggleFAQ() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  items.forEach(item => item.setAttribute('aria-expanded', 'false'))
  
  if (itemToggle == 'false') this.setAttribute('aria-expanded', 'true');
}

items.forEach(item => item.addEventListener('click', toggleFAQ));

function renderCakes() {
  fetch('http://localhost/softcake/backend/v1/bolo/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(listaProdutos => { 
    const divProdutos = document.querySelector('.produtos');
  
    produtos = Object.values(listaProdutos);

    produtos.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('card-produto');
      div.innerHTML = `
        <img src="${produto.imagens[0]}" alt="Imagem ilustrativa de ${produto.nomeCard}">
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
            <button type="button" onclick="window.location.href='/produto/?id=${produto.idBolo}'">
                <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
      `;
      divProdutos.appendChild(div);
    });
  });
}

renderCakes();