const bancoDados = require("../database/config");

function dadosTemperaturaPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Medida = 'Temperatura' 
    ORDER BY momento_registro DESC
    OFFSET 0 ROWS FETCH FIRST 100 ROWS ONLY;
    `;
  bancoDados.executar(query);
}
function dadosUsoPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Medida = 'PorcentagemUso' LIMIT 100;
    `;
  bancoDados.executar(query);
}

module.exports = {
  dadosTemperaturaPorServidor,
  dadosUsoPorServidor,
};
