"use strict"

import { imagemPreview } from "../../utils/imagem.js";
const containerAdicionarCategoria = document.getElementById('adicionar-categoria')

const tratamentoUploadImagem = ({target}) => 
{
    var idInputOrigem = target.id;
    var numeroInput = idInputOrigem.substr(-1, 1);
    var idTagDestino = `imagem${numeroInput}`;

    imagemPreview(idInputOrigem, idTagDestino)
    verificaCamposUploadDisponiveis(numeroInput)
}

const verificaCamposUploadDisponiveis = (numeroUltimoInputUsado) =>
{
    var containerInputsSecundarios = document.getElementById("secundarias")
    var numInput = parseInt(numeroUltimoInputUsado) +1

    if(document.getElementById(`inputFile${numInput}`) == null)
    {
        if (numInput <=5) 
        {
            const novaDivInputImagem = document.createElement("div")
            novaDivInputImagem.innerHTML =
            `
                <input id="inputFile${numInput}" class="inputFile" type="file" accept="image/*"/>
                <label for="inputFile${numInput}" id="labelInputFile">
                <img id="imagem${numInput}" >
                </label>
            `
            containerInputsSecundarios.appendChild(novaDivInputImagem)
            document.getElementById(`inputFile${numInput}`).addEventListener("change", tratamentoUploadImagem)
        }
        else{}
    }
    else{}
}

const tratamentoRegistroBolo = () =>
{
    
    if (validacaoCampos()) {
        const bolo = {
            nomeDetalhado: document.getElementById('titulo').value,
            nomeCard: document.getElementById('titulo-card').value,
            precoQuilo: 30,
            descricao: document.getElementById('descricao').value,
            ingredientes: [...document.querySelectorAll('.categorias input:checked')].filter(input => !isNaN(input.name)).map(input => input.name),
            novosIngredientes: [...document.querySelectorAll('.categorias input:checked')].filter(input => isNaN(input.name)).map(input => input.name),
            imagens: [...document.querySelectorAll('.imagens #conteudo img')].filter(img => img.src.trim() !== "").map(img => img.src),
        }
        
        fetch('http://localhost/softcake/backend/v1/bolo/?acao=create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bolo)
        }).then(response => response.json()).then(data => {
            console.log(data)
            if(data.status == "success") {
                alert("Bolo cadastrado com sucesso!");
                window.location.href = "/";
            } else {
                alert("Erro ao cadastrar bolo!");
            }
        })
        
    }
    else
    {
        alert("Preencha todos os campos!")
    }
}

const validacaoCampos = () =>
{
    const campoTitulo = document.getElementById("titulo")
    const campoTituloCard = document.getElementById("titulo-card")
    const campoDescricao = document.getElementById("descricao")
    const campoPrecoQuilo = document.getElementById("preco")
    const inputImagemPrincipal = document.getElementById("inputFile1")
    const imagemPrincipal = document.getElementById("imagem1")

    var retorno = true

    if (campoTitulo.value.trim() == null || campoTitulo.value == "") {
        campoTitulo.style.borderColor = "red"
        retorno = false
    }else{
        campoTitulo.style.borderColor = null
    }

    if (campoTituloCard.value.trim() == null || campoTituloCard.value == "") {
        campoTituloCard.style.borderColor = "red"
        retorno = false
    }else{
        campoTituloCard.style.borderColor = null
    }
    
    if (campoDescricao.value.trim() == null || campoDescricao.value == "") {
        campoDescricao.style.borderColor = "red"
        retorno = false
    }else{
        campoDescricao.style.borderColor = null
    }

    if (campoPrecoQuilo.value.trim() == null || campoPrecoQuilo.value == "" || campoPrecoQuilo.value != 30.0 ) {
        campoPrecoQuilo.style.borderColor = "red"
        campoPrecoQuilo.value = 30.0
        retorno = false
    }else{
        campoPrecoQuilo.style.borderColor = null
    }

    if ( inputImagemPrincipal.files[0] == null) {
        imagemPrincipal.style.borderColor = "red"       
    }
    else{
        imagemPrincipal.style.borderColor = null
    }

    return retorno
}
document.getElementById("inputFile1").addEventListener("change", tratamentoUploadImagem)
document.getElementById("inputFile2").addEventListener("change", tratamentoUploadImagem)
document.getElementById("botao-salvar").addEventListener("click", tratamentoRegistroBolo)

const adicionarCategoria = () => {
    const novaCategoria = document.getElementById('nova-categoria').value;
    if(novaCategoria.trim() != "") {
        const containerIngredientes = document.querySelector('.categorias');
        const div = document.createElement('div');
        div.classList.add('categoria');
        div.innerHTML = `
            <input type="checkbox" name="${novaCategoria}" id="ingrediente-${novaCategoria}" checked>
            <label for="ingrediente-${novaCategoria}">${novaCategoria}</label>
        `;
        containerIngredientes.appendChild(div);
        document.getElementById('nova-categoria').value = '';
    }
};

const carregarCategorias = () => {
    fetch('http://localhost/softcake/backend/v1/ingrediente/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(listaIngredientes => {
        const containerIngredientes = document.querySelector('.categorias');

        const ingredientes = Object.values(listaIngredientes.message);
        ingredientes.forEach(ingrediente => {
            const div = document.createElement('div');
            div.classList.add('categoria');
            div.innerHTML = `
                <input type="checkbox" name="${ingrediente.idIngrediente}" id="ingrediente-${ingrediente.nome}">
                <label for="ingrediente-${ingrediente.nome}">${ingrediente.nome}</label>
            `;
            containerIngredientes.appendChild(div);
        });

        containerAdicionarCategoria.innerHTML = `
            <input type="text" placeholder="Nova categoria" name="nova-categoria" id="nova-categoria">
            <button type="button" id="botao-adicionar-categoria">Adicionar</button>
        `;
        containerAdicionarCategoria.querySelector('button').addEventListener('click', adicionarCategoria);
        
    });
}

carregarCategorias();