function mascaraCNPJ() {
  var cnpj = ipt_cnpj.value;

  cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  ipt_cnpj.value = cnpj;
}

function mascaraCEP() {
  var valorCep = ipt_cep.value;

  valorCep = valorCep.replace(/^(\d{4})(\d{3})/, "$1-$2");

  ipt_cep.value = valorCep;
}

function gerarSenha() {
  const chracters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*(){}[];:<>?";
  var limit = 16;
  var password = "";
  var email = ipt_email_usuario.value;

  for (var i = 1; i <= limit; i++) {
    var random = Math.floor(Math.random() * chracters.length);
    password += chracters[random];
  }

  return password;
}

function verificarCampos() {
  var nomeFantasia = ipt_nome_fantasia.value;
  var cnpj = ipt_cnpj.value;
  var cep = ipt_cep.value;
  var emailEmpresa = ipt_email_empresa.value;
  var nomeUsuario = ipt_nome_usuario.value;
  var emailUsuario = ipt_email_usuario.value;
  var erro = false;

  console.log(
    `
      Empresa: ${nomeFantasia}
      Cnpj: ${cnpj}
      Cep: ${cep}
      Email Empresa: ${emailEmpresa}
      Nome Usuario: ${nomeUsuario}
      Email Usuario: ${emailUsuario}
    `
  );

  if (nomeFantasia == "") {
    toastr.error("Campo Nome Fantasia inválido!");
    erro = true;
  }
  if (cnpj == "" || cnpj.length != 18) {
    toastr.error("Campo Cnpj inválido!");
    erro = true;
  }
  if (cep == "" || cep.length != 9) {
    toastr.error("Campo Cep inválido!");
    erro = true;
  }
  if (emailEmpresa == "" || emailEmpresa.indexOf("@") == -1) {
    toastr.error("Campo Email Empresa inválido!");
    erro = true;
  }
  if (nomeUsuario == "") {
    toastr.error("Campo Nome Usuário inválido!");
    erro = true;
  }
  if (emailUsuario == "" || emailUsuario.indexOf("@") == -1) {
    toastr.error("Campo Email Usuário inválido!");
    erro = true;
  }
  if (erro == false) {
    cadastrarEmpresa(
      nomeFantasia,
      cnpj,
      cep,
      emailEmpresa,
      nomeUsuario,
      emailUsuario
    );
  }
}

function cadastrarEmpresa(
  nomeFantasia,
  cnpj,
  cep,
  emailEmpresa,
  nomeUsuario,
  emailUsuario
) {
  var senha = gerarSenha();

  fetch("/empresa/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeEmpresaServer: nomeFantasia,
      nomeAdmServer: nomeUsuario,
      emailEmpresaServer: emailEmpresa,
      emailAdmServer: emailUsuario,
      cnpjServer: cnpj,
      cepServer: cep,
      senhaCadastroServer: senha,
    }),
  })
    .then(function (resposta) {
      console.log("Entrando do then");
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          console.log(emailUsuario);
          form.innerHTML = `
            <div class='div-message'>
                <h1> 
                    Falta Pouco!
                </h1>
                <h2>
                    Um email com sua senha foi enviado para: ${emailUsuario}. 
                    Faça login para acessar nosso DashBoard!
                </h2>
                <button class='btn btn-enviar'>Login</button>
            </div>`;
        });
      } else {
        console.log("Houve um erro ao realizar o cadastro!");
        toastr.error(
          "Infelizmente, não conseguimos realizar o seu cadastro.\nTente denovo mais tarde!"
        );

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
  return false;
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
