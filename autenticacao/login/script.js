document.getElementById('autenticar').addEventListener('click', function(e){
    e.preventDefault();
    let dados = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost/softcake/backend/v1/perfil/login/', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.status == 'error') {
            alert(data.message);
        } else {
            localStorage.setItem('token', data.message);
            window.location.href = '../../';
        }
    });
});