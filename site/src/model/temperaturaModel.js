const bancoDados = require("../database/config");

function dadosTemperaturaPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Medida = 'Temperatura' 
    ORDER BY momento_registro DESC
    OFFSET 0 ROWS FETCH FIRST 100 ROWS ONLY;
    `;
  return bancoDados.executar(query);
}
function dadosUsoCpuPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Cpu' LIMIT 100
    ORDER BY momento_registro DESC
    OFFSET 0 ROWS FETCH FIRST 100 ROWS ONLY;
    `;
  return bancoDados.executar(query);
}
function dadosUsoMemPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Memoria' LIMIT 100
    ORDER BY momento_registro DESC
    OFFSET 0 ROWS FETCH FIRST 100 ROWS ONLY;
    `;
  return bancoDados.executar(query);
}
function dadosUsoDiscoPorServidor(fkServidor) {
  let query = `SELECT * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Disco' LIMIT 100
    ORDER BY momento_registro DESC
    OFFSET 0 ROWS FETCH FIRST 100 ROWS ONLY;
    `;
  return bancoDados.executar(query);
}
function servidoresPorEmpresa(fkEmpresa) {
  let query = `SELECT * FROM Servidor WHERE fk_empresa = ${fkEmpresa}
    `;
  return bancoDados.executar(query);
}

module.exports = {
  dadosTemperaturaPorServidor,
  dadosUsoCpuPorServidor,
  dadosUsoMemPorServidor,
  dadosUsoDiscoPorServidor,
  servidoresPorEmpresa
};
