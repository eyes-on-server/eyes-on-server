var sql = require('mssql');

var sqlServerConfig = {
    server: "172.17.0.1",
    database: "Eyes_On_Server",
    user: "sa",
    password: "@Urubu100",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },  
	options: {
        encrypt: false
    }
}


function executar(instrucao) {
  return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
                return sql.query(instrucao);
            }).then(function (resultados) {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(function (erro) {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL SERVER: ", erro);
            });
        });
}

module.exports = { executar };
