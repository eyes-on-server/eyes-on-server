const mysql = require('mysql2');

var configBd = {
host: "localhost",
database: "eye-on-server",
user: "aluno",
password: "sptech"
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
            return ("ERROOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!! \n, erro:config.js")
        })
    })
}


module.exports = {consultaBd}

