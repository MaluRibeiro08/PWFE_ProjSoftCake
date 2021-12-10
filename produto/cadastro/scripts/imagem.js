'use strict'

const imagemPreview = (idFile, idImagem) =>
{
    //criando a imagem e o lugar onde a colocaremos 
    const file = document.getElementById(idFile).files[0];
    const preview = document.getElementById(idImagem);
    
    // add um leitor de instanciando a CLASSE FileReader
        const fileReader = new FileReader();

    // colocando a imagem no lugar certo
        if (file) 
        {
            //le o arquivo vindo como url
                fileReader.readAsDataURL(file);
        }
        else
        {
            preview.src = './img/foto.png';
        }
        //quando terminar de carregar e de ler, coloca lá
        fileReader.onloadend = () => (preview.src = fileReader.result);
        //add um evento a algo. Usa-se quando só se quer monitor 1 acontecimento
}

export { imagemPreview };
//o export poderia ser colocado antes de cada função.