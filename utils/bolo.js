import { cortarArray } from './funcoes.js';
import { getEstrelas } from './estrelas.js';

var produtos;
const wrapperFiltro = document.querySelector('.filtro-ingredientes');
const wrapperPaginacao = document.querySelector('.paginacao');
const botoesPaginacao = wrapperPaginacao.querySelectorAll('a');
var paginaAtual = 1;

const obterBolos = (isAdmin, filtro = null) => {
	fetch('http://localhost/softcake/backend/v1/bolo/', {
	  method: 'GET',
	  headers: {
			'Content-Type': 'application/json'
	  }
	}).then(response => response.json()).then(listaProdutos => {
	  listaProdutos = Object.values(listaProdutos);
	  listaProdutos = filtro != null ? listaProdutos.filter(produto => produto.nomeDetalhado.toLowerCase().includes(filtro.toLowerCase())) : listaProdutos;
	  produtos = cortarArray(listaProdutos, 6);
	  
	  renderizarBolos(produtos[0], isAdmin);
	});
}

const renderizarBolos = (produtos, isAdmin) => {
	limparBolos();
	const divProdutos = document.querySelector('.produtos');
  if(produtos == undefined || produtos.length == 0) {
    divProdutos.innerHTML = `
      <div class="sem-resultados">
        <h2>Nenhum resultado encontrado</h2>
      </div>
    `;
  } else {
	[...produtos].forEach(produto => {
	  const div = document.createElement('div');
	  div.classList.add('card-produto');
  
	  var estrelas = getEstrelas(produto["media-avaliacoes"]);
	  
	  div.innerHTML = `
	  ${isAdmin == true ? `
	    <div class="acoes-produtos">
	  		<i class="fas fa-edit" onclick="window.location.href = '/produto/edicao/?id=${produto.idBolo}'"></i>
	  		<i class="fas fa-trash" id="deletar-${produto.idBolo}"></i>
	    </div>
	  ` : ''}
	    <img src="${produto.imagens[0]}" alt="Imagem ilustrativa de ${produto.nomeCard}">
	    <div class="informacoes">
	  	  <div class="titulo">
	  		  <h4>${produto.nomeCard}</h4>
	  		  <h5>R$${produto.precoPorQuilo}</h5>
	  	  </div>
	  	  <div class="estrelas">
	  			${estrelas.join('')}
	  	  </div>
	  	  <button type="button" onclick="window.location.href='/produto/?id=${produto.idBolo}'">
	  		  <i class="fas fa-shopping-cart"></i>
	  	  </button>
	    </div>
	  `;
		
	  divProdutos.appendChild(div);

		divProdutos.querySelector(`#deletar-${produto.idBolo}`).addEventListener('click', () => {
			deletarBolo(produto.idBolo);
		});
	  });
  }
}

const limparBolos = () => {
	const divProdutos = document.querySelector('.produtos');
	divProdutos.innerHTML = '';
}

const editarBolo = (id) => {
	window.location.href = `/produto/edicao/?id=${id}`;
};

const deletarBolo = (id) => {
	const confirmacao = confirm('Deseja realmente excluir este produto?');
  
	if(confirmacao) {
	  fetch(`http://localhost/softcake/backend/v1/bolo/?idBolo=${id}`, {
			method: 'DELETE'
	  }).then(response => response.json()).then(response => {
			console.log(response);
			
			if(response.status == 'success') {
				alert('Produto excluído com sucesso!');
				limparBolos();
				obterBolos(true);
			} else {
				alert('Erro ao excluir produto!');
			}
			
	  });
	}
};

const carregarUtilitarios = (isAdmin) => {
  const carregarFiltros = () => {
    fetch('http://localhost/softcake/backend/v1/ingrediente/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(listaIngredientes => {
      const ingredientes = Object.values(listaIngredientes.message);
      ingredientes.forEach(ingrediente => {
        const div = document.createElement('div');
        div.classList.add('filtro-ingrediente');
        div.innerHTML = `
            <input type="checkbox" name="ingrediente" id="${ingrediente.idIngrediente}" checked>
            <label for="${ingrediente.idIngrediente}">${ingrediente.nome}</label>
        `;
        wrapperFiltro.appendChild(div);
      });
    }).then(() => {
      const filtrarIngredientes = () => {
        const checkboxesFiltros = wrapperFiltro.querySelectorAll('input[type="checkbox"]:checked');
        const filtros = [...checkboxesFiltros].map((checkbox => checkbox.parentElement.textContent.trim()));
      
        limparBolos();
        renderizarBolos(produtos[paginaAtual-1].filter(produto => produto.ingredientes.every(ingrediente => filtros.includes(ingrediente))), isAdmin);
      }
      
      wrapperFiltro.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.addEventListener('change', filtrarIngredientes));    
    })
  }

  carregarFiltros();

  botoesPaginacao.forEach(botao => botao.addEventListener('click', event => {
    botoesPaginacao.forEach(botao => botao.classList.remove('active'));
    if(event.target.textContent.includes('Próximo')) {
      paginaAtual++;
      [...botoesPaginacao].find(botao => botao.textContent.includes(paginaAtual)).classList.add('active');
    } else {
      paginaAtual = parseInt(event.target.textContent);
      event.target.classList.add('active');
    }

    limparBolos();
    renderizarBolos(produtos[paginaAtual-1], isAdmin);
  }));
  
}

export { obterBolos, carregarUtilitarios };