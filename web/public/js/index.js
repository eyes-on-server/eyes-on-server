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