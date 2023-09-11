function validar_sessao() {
    var email = sessionStorage.EMAIL_USER;
    var nome = sessionStorage.NOME_USER;

    if (email != null && nome != null) {
        console.log("Sessão OK");
    } else {
        alert("Faça o login para acessar esssa página");
        window.location = "../login.html"
    }
}

function exibirNome(){
    span_nome_exbir.innerHTML = sessionStorage.NOME_USER;
    
    if(sessionStorage.NOME_EMPRESA == '' || sessionStorage.NOME_EMPRESA == 'NULL'){
        fetch("/empresa/selecionar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresa_html: sessionStorage.EMPRESA_USER
            })
        }).then(function(resposta) {

            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.NOME_EMPRESA = json.nomeFantasia;
                    span_nomeEmpresa_exbir.innerHTML = sessionStorage.NOME_EMPRESA;
                })
            } else {
                throw("Erro ao buscar nome da empresa");
            }
        }).catch(function (resposta){
            console.log(`#ERRO AO BUSCAR NOME DA EMPRESA: ${resposta}`);
        });
        return false;
    }
    else{
        span_nomeEmpresa_exbir.innerHTML = sessionStorage.NOME_EMPRESA;
    }
    
}