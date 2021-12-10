"use strict"

import { imagemPreview } from "./imagem.js";

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
        console.log("oi! deu certo")
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

const adicionarCategoria = () => {};

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
                <input type="checkbox" name="${ingrediente.idIngrediente}" id="${ingrediente.idIngrediente}">
                <label for="${ingrediente.idIngrediente}">${ingrediente.nome}</label>
            `;
            containerIngredientes.appendChild(div);
        });

        const div = document.createElement('div');
        div.classList.add('categoria');
        div.innerHTML = `
            <input type="text" placeholder="Nova categoria" name="nova-categoria" id="nova-categoria">
            <button type="button" id="adicionar-categoria">Adicionar</button>
        `;
        div.addEventListener('click', adicionarCategoria);

        containerIngredientes.appendChild(div);
    });
}

carregarCategorias()