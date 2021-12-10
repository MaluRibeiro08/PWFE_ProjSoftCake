'use strict';

var userToken = localStorage.getItem('token');

var getUser = async (token) => {
    if(token != null) {
        const user = await fetch('http://localhost/softcake/backend/v1/perfil/?acao=get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    
        return await user.json();
    }
    return null;
}

var perfil;

getUser(userToken).then(userData => {
    perfil = userData;
    console.log(perfil)

    document.getElementById('input-nome-usuario').value = perfil.usuario.nome;
    document.getElementById('input-email-usuario').value = perfil.email;
    document.getElementById('input-cpf-usuario').value = perfil.usuario.cpf

    /*
    email: "cristiano@gmail.com"
    foto: null
    idPerfil: "7"
    isAdmin: "0"
    usuario: {idUsuario: '13', cpf: '15519262', nome: 'Cristiano', telefone: '15268929'}

    */
});

//eventos
// document.getElementById('btn-alterar-foto-perfil').addEventListener('click', carregarNovaFoto());
// document.getElementById('button-remover-foto-perfil').addEventListener('click', removerFoto());