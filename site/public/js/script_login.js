function entrar() {
  var email = ipt_email.value;
  var senha = ipt_senha.value;
  var erro = false;

  console.log(
    `
     Email: ${email}
     Senha: ${senha}
    `
  );

  if (email.length == 0) {
    toastr.error("Campo do Email inválido!");
    erro = true;
  }

  if (senha.length == 0) {
    toastr.error("Campo da Senha inválido!");
    erro = true;
  }

  if (!erro) {
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: email,
        senhaServer: senha,
      }),
    }).then(function (resposta) {
      console.log("Entrando no then!");

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json.nome_fantasia));

          sessionStorage.ID_LOGIN = json.id_usuario;
          sessionStorage.NOME_USER = json.nome;
          sessionStorage.EMAIL_USER = json.email;
          sessionStorage.CARGO = json.cargo == 1 ? "Gerente" : "Analista";
          sessionStorage.NOME_FANTASIA = json.nome_fantasia;
          sessionStorage.FK_EMPRESA = json.fk_empresa;

          console.log(sessionStorage.CARGO);

          if (sessionStorage.CARGO == "Gerente") {
            window.location = "../dashboard/dashboardGerente.html";
          } else {
            window.location = "../dashboard/dashboardAnalista.html";
          }
        });
      } else {
        console.log("Houve um erro ao realizar o login!");
        toastr.error(
          "Infelizmente, não conseguimos realizar o seu login.\nTente denovo mais tarde!"
        );
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    });
  }
}

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
