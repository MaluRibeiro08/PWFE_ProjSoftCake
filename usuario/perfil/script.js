'use strict';

import { imagemPreview } from "../../utils/imagem.js";
const componenteFotoPerfil = document.getElementById('foto-perfil');
document.getElementById(`input-foto-perfil`).addEventListener("change", () => imagemPreview("input-foto-perfil", "foto-perfil"));

var userToken = localStorage.getItem('token');

var getUser = async (token) => {
    if(token != null) {
        const user = await fetch('http://localhost/softcake/backend/v1/perfil/token/', {
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
    console.log(perfil);

    document.getElementById('input-nome-usuario').value = perfil.usuario.nome;
    document.getElementById('input-email-usuario').value = perfil.email;
    document.getElementById('input-cpf-usuario').value = perfil.usuario.cpf
    componenteFotoPerfil.src = perfil.foto ?? "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

    /*
    email: "cristiano@gmail.com"
    foto: null
    idPerfil: "7"
    isAdmin: "0"
    usuario: {idUsuario: '13', cpf: '15519262', nome: 'Cristiano', telefone: '15268929'}

    */
});

const atualizarPerfil = () => {
    const inputCpf = document.getElementById('input-cpf-usuario').value;
    if(inputCpf !== perfil.usuario.cpf) {
        alert('CPF não pode ser alterado');
        return;
    }
    const usuario = {
        idUsuario: perfil.usuario.idUsuario,
        email: document.getElementById('input-email-usuario').value,
        senha: document.getElementById('input-senha-usuario').value,
        nome: document.getElementById('input-nome-usuario').value,
        foto: componenteFotoPerfil.src
    }

    console.log(usuario)

    fetch('http://localhost/softcake/backend/v1/perfil/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json()).then(data => {
        console.log(data);
        if(data.status === 'success') {
            localStorage.setItem('token', data.message);
            alert('Perfil atualizado com sucesso!');
            window.location.href = '/';
        } else {
            alert('Erro ao atualizar perfil');
        }
    })
}

document.getElementById('btn-remover-foto-perfil').addEventListener('click', () => componenteFotoPerfil.src = "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png");
document.getElementById('btn-salvar-perfil').addEventListener('click', atualizarPerfil)