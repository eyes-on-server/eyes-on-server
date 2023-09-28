const mysql = require("mysql2");

var sqlConfig = {
  host: "localhost",
  database: "Eyes_On_Server",
  user: "root",
  password: "@Jsp0706",
};

function executar(instrucao) {
  return new Promise((resolve, reject) => {
    var conexao = mysql.createConnection(sqlConfig);
    conexao.connect();

    conexao.query(instrucao, (erro, resultados) => {
      conexao.end();

      if (erro) {
        reject(erro);
      }

      resolve(resultados);
    });

    conexao.on("error", function (erro) {
      return "ERRO NO MySQL: ", erro.sqlMessage;
    });
  });
}

module.exports = { executar };
