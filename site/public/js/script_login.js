function mascaraCNPJ() {
  var cnpj = ipt_cnpj.value;

  cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  ipt_cnpj.value = cnpj;
}

function mascaraCEP() {
  var valorCep = cep.value;

  valorCep = valorCep.replace(/^(\d{4})(\d{3})/, "$1-$2");

  cep.value = valorCep;
}

function gerarSenha() {
  const chracters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*(){}[];:<>?";
  var limit = 16;
  var password = "";
  var email = ipt_email_func.value;

  for (var i = 1; i <= limit; i++) {
    var random = Math.floor(Math.random() * chracters.length);
    password += chracters[random];
  }

  form.innerHTML = `
    <div class='div-message'>
        <h1> 
            Falta Pouco!
        </h1>
        <h2>
            Um email com sua senha foi enviado para: ${email}. 
            Faça login para acessar nosso DashBoard!
        </h2>
        <button class='btn btn-entrar'>Login</button>
    </div>
  `;
}
