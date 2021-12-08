var produto;
const inputQuantidade = document.querySelector(".quantidade input");

const idBolo = new URLSearchParams(window.location.search).get('id');

const componenteTitulo = document.getElementById('titulo');
const componenteTituloCard = document.getElementById('titulo-card');
const componenteDescricao = document.getElementById('descricao');
const componentePreco = document.getElementById('preco');
const imagemPrincipal = document.getElementById("principal");
const containerImagensSecundarias = document.querySelector(".secundarias")

const renderizarBolo = () => {
    fetch(`http://localhost/softcake/backend/v1/bolo/?idBolo=${idBolo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(responseProduto => {
    produto = Object.values(responseProduto)[0];

    componenteTitulo.value = produto.nomeDetalhado;
    componenteTituloCard.value = produto.nomeCard;
    componenteDescricao.value = produto.descricao
    componentePreco.value = `R$${parseFloat(produto.precoPorQuilo).toFixed(2).replace(".", ",")}`;
    imagemPrincipal.src = produto.imagens[0];
    imagemPrincipal.alt = produto.nomeCard;

    produto.imagens.forEach((imagem, indice) => {
        const img = document.createElement('img');
        if(indice == 0) {
            img.className = "selected"
        }
        img.src = imagem;
        img.alt = `${produto.nomeCard} - ${indice+1}`;
        
        containerImagensSecundarias.appendChild(img);
    })

    const addInput = document.createElement('input');
    addInput.type = "file";
    addInput.name = "imagens";
    addInput.multiple = true;

    const inputContainer = document.createElement('div');
    inputContainer.appendChild(addInput)

    containerImagensSecundarias.appendChild(inputContainer);

    containerImagensSecundarias.childNodes.forEach(imagem => {
        if(imagem.tagName == "IMG") {
            imagem.addEventListener('click', (event) => {
                imagemPrincipal.src = event.target.src;
                imagemPrincipal.alt = event.target.alt;
                containerImagensSecundarias.childNodes.forEach(imagem => imagem.className = "");
                event.target.className = "selected";
            })
        }
    })

  })
}

renderizarBolo()

inputQuantidade.addEventListener("click", (event) => {
    componentePreco.textContent = `R$${(parseFloat(precoOriginal)*parseFloat(event.target.value)*(kgs !== 0 ? kgs : 1)).toFixed(2).replace(".", ",")}`;
})