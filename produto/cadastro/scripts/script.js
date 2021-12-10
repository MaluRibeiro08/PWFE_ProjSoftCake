"use strict"

import { imagemPreview } from "./imagem.js";

const tratarImagem = ({target}) => 
{
    console.log('A')
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
        containerInputsSecundarios.innerHTML += `
            <div>
                <input id="inputFile${numInput}" class="inputFile" type="file" accept="image/*"/>
                <label for="inputFile${numInput}" id="labelInputFile">
                    <img id="imagem${numInput}" >
                </label>
            </div>
        `;

        console.log(`inputFile${numInput}`)

        document.getElementById(`inputFile${numInput}`).addEventListener("change", tratarImagem)
    }
    else
    {
        console.log("tudo ok hehe")
    }
}

document.getElementById("inputFile1").addEventListener("change", tratarImagem)
document.getElementById("inputFile2").addEventListener("change", tratarImagem)

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