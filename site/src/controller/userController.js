var userModel = require("../model/userModel");

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
  console.log(`\n[User Controller] ${nome_funcao}`);
}

// Funções para exportar
function listar(req, res) {
  info("listar()");
  userModel
    .listar()
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res
          .status(204)
          .send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!");
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log("!! ERRO > UserController: Listar()\n", erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  info("cadastrar()");

  if (nomeAdm == undefined) {
    res.status(400).send("Nome do administrador indefinido!");
  } else if (emailAdm == undefined) {
    res.status(400).send("Email do administrador indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Senha indefinida!");
  } else {
    userModel
      .primeiroCadastro(nomeAdm, emailAdm, senha)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function login(req, res) {
  info("login()");

  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  console.log(req.body);

  console.log("estou na controller");
  console.log(email);
  console.log(senha);

  if (email == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  }

  userModel
    .login(email, senha)
    .then(function (resultado) {
      if (resultado.length == 1) {
        console.log(resultado);
        res.json(resultado[0]);
      } else if (resultado.length == 0) {
        res.status(403).send("Email e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function consultar(req, res) {
  info("consultar()");

  var id_server = req.body.id_user_html;
  var nome_server = req.body.nome_user_html;

  if (nome_server == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else if (id_server == undefined) {
    res.status(400).send("Sua senha está indefinido!");
  }

  userModel
    .consultar(id_server, nome_server)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res
          .status(204)
          .send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!");
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log("!! ERRO > UserController: Listar()\n", erro.sqlMessage);
    });
}

function atualizar(req, res) {
  info("atualizar()");
  var id_server = req.body.id_html;
  var nome_server = req.body.nome_html;
  var email_server = req.body.email_html;
  var senha_server = req.body.senha_html;

  if (nome_server == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else if (email_server == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha_server == undefined) {
    res.status(400).send("Sua senha está indefinido!");
  } else if (id_server == undefined) {
    res.status(400).send("Sua senha está indefinido!");
  } else {
    userModel
      .atualizar(id_server, nome_server, email_server, senha_server)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletar(req, res) {
  info("deletar()");
  var email_server = req.body.email_html;
  var senha_server = req.body.senha_html;

  if (email_server == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha_server == undefined) {
    res.status(400).send("Sua senha está indefinido!");
  } else {
    userModel
      .deletar(senha_server, email_server)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  listar,
  login,
  cadastrar,
  login,
  consultar,
  atualizar,
  deletar,
};
