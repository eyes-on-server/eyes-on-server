const mysql = require('mysql2');

var configBd = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

function consultaBd(pesquisa) {
    return new Promise((resolve, reject) => {
        var conexao = mysql.createConnection(configBd);
        conexao.connect();

        conexao.query(pesquisa, (erro, resultados) => {
            conexao.end();

            if (erro) {
                reject(erro);
            }

            resolve(resultados);

        });

        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL: ", erro.sqlMessage)
        })
    
    })
}


module.exports = {consultaBd}