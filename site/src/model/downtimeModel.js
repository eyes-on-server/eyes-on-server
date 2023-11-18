const database = require("../database/config");

function popularCards(fkEmpresa) {
  const query = `
    SELECT 
      SUM(prejuizo) prejuizo_total, 
      SUM(tempo_downtime) total_downtime 
    FROM View_Downtime_Servidores
    WHERE id_empresa = ${fkEmpresa};`;

  return database.executar(query);
}

function popularTabela(fkEmpresa) {
  const query = `
    SELECT 
      id_servidor, 
      nome_servidor, 
      SUM(tempo_downtime) total_downtime, 
      SUM(prejuizo) total_prejuizo 
    FROM View_Downtime_Servidores 
    WHERE id_empresa = ${fkEmpresa}
    GROUP BY id_servidor
    ORDER BY total_prejuizo DESC`;

  return database.executar(query);
}

function downtimePorLocal(fkEmpresa) {
  const query = `
    SELECT 
      SUM(prejuizo) total_prejuizo,
      local_servidor
    FROM View_Downtime_Servidores 
    WHERE id_empresa = ${fkEmpresa}
    GROUP BY local_servidor;`;

  return database.executar(query);
}

module.exports = {
  popularCards,
  popularTabela,
  downtimePorLocal,
};
