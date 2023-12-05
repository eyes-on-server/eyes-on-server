const bancoDados = require("../database/config");

function dadosTemperaturaPorServidor(fkServidor) {
  let query = `SELECT TOP 100 * FROM View_Registros WHERE Servidor = ${fkServidor} AND Medida = 'Temperatura' 
    ORDER BY Momento DESC;
    `;
  return bancoDados.executar(query);
}
function dadosUsoCpuPorServidor(fkServidor) {
  let query = `SELECT TOP 100 * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Cpu'
    ORDER BY Momento DESC;
    `;
  return bancoDados.executar(query);
}
function dadosUsoMemPorServidor(fkServidor) {
  let query = `SELECT TOP 100 * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Memoria'
    ORDER BY Momento DESC;
    `;
  return bancoDados.executar(query);
}
function dadosUsoDiscoPorServidor(fkServidor) {
  let query = `SELECT TOP 100 * FROM View_Registros WHERE Servidor = ${fkServidor} AND Componente = 'Disco'
    ORDER BY Momento DESC;
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
