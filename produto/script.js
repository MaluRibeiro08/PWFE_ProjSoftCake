import { getEstrelas } from '/utils/estrelas.js';

var produto;
var kgs = 0;
const inputQuantidade = document.querySelector(".quantidade input")

const precos = {
    "300g": 15.00,
    "500g": 20.00
}

var tipo = "500g";
var precoOriginal = precos["500g"];

const idBolo = new URLSearchParams(window.location.search).get('id');

const componenteTitulo = document.getElementById('titulo');
const componenteDescricao = document.getElementById('descricao');
const componentePreco = document.getElementById('preco');
const imagemPrincipal = document.getElementById("principal");
const containerImagensSecundarias = document.querySelector(".secundarias")
const botaoComprar = document.getElementById('botao-comprar');
const containerAvaliacoes = document.getElementById('card-avaliacoes');

const renderizarBolo = () => {
    fetch(`http://localhost/softcake/backend/v1/bolo/?idBolo=${idBolo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(responseProduto => {
    produto = Object.values(responseProduto)[0];

    componenteTitulo.textContent = produto.nomeDetalhado;
    componenteDescricao.textContent = produto.descricao
    // componentePreco.textContent = `R$${parseFloat(produto.precoPorQuilo).toFixed(2).replace(".", ",")}`;
    imagemPrincipal.src = produto.imagens[0];
    imagemPrincipal.alt = produto.nomeCard;

    produto.imagens.forEach((imagem, indice) => {
        const img = document.createElement('img');
        if(indice == 0) {
            img.className = "selected"
        }
        img.src = imagem;
        img.alt = `${produto.nomeCard} - ${indice+1}`
        containerImagensSecundarias.appendChild(img)
    });

    containerImagensSecundarias.childNodes.forEach(imagem => {
        imagem.addEventListener('click', (event) => {
            imagemPrincipal.src = event.target.src;
            imagemPrincipal.alt = event.target.alt;
            containerImagensSecundarias.childNodes.forEach(imagem => imagem.className = "")
            event.target.className = "selected";
        });
    });

    if(produto.avaliacoes.length > 0) {
        produto.avaliacoes.forEach(avaliacao => {
            const estrelas = getEstrelas(avaliacao.nota);
            containerAvaliacoes.innerHTML += `
                <div class="avaliacao" id="${avaliacao.idAvaliacao}">
                    <p id="texto-avaliacao">${avaliacao.comentario}</p>
                    <div class="informacoes-avaliacao">
                        <div class="usuario">
                            <div class="avatar">
                                <img src="${avaliacao.usuario.foto ?? 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}" alt="${avaliacao.usuario.nome}">
                            </div>
                            <p id="nome-usuario">${avaliacao.usuario.nome}</p>
                        </div>
                        <div class="estrelas">
                            ${estrelas.join('')}
                        </div>
                    </div>
                </div>
            `;
        })
    } else {
        containerAvaliacoes.innerHTML = `
            <p>Nenhuma avaliação para este bolo</p>
        `
    }

  });
}

renderizarBolo()

const containerTipos = document.querySelector(".tipos");

containerTipos.addEventListener("click", (event) => {
    const disableButtons = () => {
        containerTipos.querySelectorAll(".selected").forEach((item) => {
            if(item != event.target) item.className = "";
        });
    }

    if(event.target.tagName == "INPUT") {
        disableButtons();
        event.target.parentElement.className = "selected";

        kgs = event.target.value;
        precoOriginal = parseFloat(produto.precoPorQuilo)
        componentePreco.textContent = `R$${(precoOriginal*parseFloat(inputQuantidade.value)*kgs).toFixed(2).replace(".", ",")}`;
        tipo = `${kgs}kgs`;
    } else if(event.target.className == "") {
        disableButtons();
        event.target.className = "selected";
        
        if(event.target.textContent.includes("300g")) {
            componentePreco.textContent = `R$${precos["300g"].toFixed(2).toString().replace(".", ",")}`;
            precoOriginal = precos["300g"];
            tipo = "300g";

        } else if(event.target.textContent.includes("500g")) {
            componentePreco.textContent = `R$${precos["500g"].toFixed(2).toString().replace(".", ",")}`;
            precoOriginal = precos["500g"];
            tipo = "500g";
        } else {
            componentePreco.textContent = `R$${parseFloat(produto.precoPorQuilo).toFixed(2).replace(".", ",")}`;
            precoOriginal = parseFloat(produto.precoPorQuilo);
            tipo = "1kg";
        }
    }
})

botaoComprar.addEventListener('click', () => {
    console.log("A")
    window.location.href = `https://api.whatsapp.com/send?phone=551198989898&text=Olá,%20gostaria%20de%20comprar%20${inputQuantidade.value} unidade${inputQuantidade.value !== "1" ? 's' : ''}%20de%20${tipo}%20do%20${produto.nomeDetalhado}`;
});

inputQuantidade.addEventListener("click", (event) => {
    componentePreco.textContent = `R$${(parseFloat(precoOriginal)*parseFloat(event.target.value)*(kgs !== 0 ? kgs : 1)).toFixed(2).replace(".", ",")}`;
})