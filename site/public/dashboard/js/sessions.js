let idUsuario = sessionStorage.ID_LOGIN;
let usuario = sessionStorage.NOME_USER;
let email = sessionStorage.EMAIL_USER;
let cargo = sessionStorage.CARGO;
let nomeEmpresa = sessionStorage.NOME_FANTASIA;

function verificarSession() {
  if (idUsuario == null || email == null) {
    alert("Você não tem acesso à essa página!");
    location.href = "../../login.html";
  } else {
    document.getElementById("user_name").innerHTML = usuario;
    document.getElementById("company_name").innerHTML = nomeEmpresa;
  }
}

function destruirSession() {
  sessionStorage.clear();
  location.href = "../login.html";
}
