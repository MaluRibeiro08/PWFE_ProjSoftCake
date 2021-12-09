function cortarArray(arr, tamanhoChunk) {
    var arrayCortada = [];
    for (var i=0,len=arr.length; i<len; i+=tamanhoChunk)
      arrayCortada.push(arr.slice(i,i+tamanhoChunk));
    return arrayCortada;
}

export { cortarArray }