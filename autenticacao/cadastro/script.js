document.getElementById('cadastrar').addEventListener('click', function(e){
    e.preventDefault();
    let dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cpf: document.getElementById('cpf').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost/softcake/backend/v1/perfil/cadastro/', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        alert(data.message);
        if(data.status !== 'error') {
            window.location.href = '../login';
        }
    });
});