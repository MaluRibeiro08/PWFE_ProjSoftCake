"use strict"

import { imagemPreview } from "./imagem.js";

const tratarImagem = ({target}) => 
{
    var idInputOrigem = target.id;
    var numeroInput = idInputOrigem.substr(-1, 1);
    var idTagDestino = `imagem${numeroInput}`;

    console.log(idInputOrigem);
    console.log(numeroInput);
    console.log(idTagDestino);

    imagemPreview(idInputOrigem, idTagDestino)
}

document.getElementById("inputFile1").addEventListener("change", tratarImagem)
document.getElementById("inputFile2").addEventListener("change", tratarImagem)
document.getElementById("inputFile3").addEventListener("change", tratarImagem)
