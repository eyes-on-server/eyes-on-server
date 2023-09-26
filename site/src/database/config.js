const mysql = require("mysql2");

var sqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
