const mysql = require('mysql2');

var configBd = {
    host: "localhost",
    database: "eye-on-server",
    user: "root",
    password: "OcEuEch31r0s077@"
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

