const mailerModel = require("../model/mailerModel");

function enviarEmail(req, res) {
  let email = req.body.mailerEmail;
  let senha = req.body.mailerPassword;

  if (senha == undefined) {
    console.error("Senha indefinida!");
  } else if (email == undefined) {
    console.error("Email indefinido!");
  } else {
    mailerModel
      .enviarEmail(email, senha)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}

module.exports = { enviarEmail };
