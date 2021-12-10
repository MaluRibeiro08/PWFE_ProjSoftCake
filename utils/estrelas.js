function getEstrelas(quantidadeEstrelas) {
    var estrelas = [];
    for(let i = 0; i < quantidadeEstrelas; i++) {
        estrelas.push(`<i class="fas fa-star atingida"></i>`)
    }
    
    if(estrelas.length < 5) {
        for(let i = estrelas.length; i < 5; i++) {
            estrelas.push(`<i class="fas fa-star"></i>`)
        }
    }
    return estrelas;
}

export { getEstrelas };