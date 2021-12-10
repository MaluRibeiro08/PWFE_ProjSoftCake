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
