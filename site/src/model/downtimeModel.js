const database = require("../database/config");

function popularCards(fkEmpresa) {
  const query = `SELECT SUM(prejuizo) prejuizo_total, SUM(tempo_downtime) total_downtime from View_Downtime_Servidores where id_empresa = ${fkEmpresa};`;
  return database.executar(query);
}

module.exports = {
  popularCards,
};
