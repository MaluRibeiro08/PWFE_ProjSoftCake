document.getElementById('autenticar').addEventListener('click', function(e){
    e.preventDefault();
    let dados = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost/softcake/backend/v1/auth/?acao=login', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        if(data.status == 'error') {
            alert(data.message);
        } else {
            localStorage.setItem('token', data.message);
            window.location.href = '../../index.html';
        }
    });
});