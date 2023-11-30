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
      fk_servidor, 
      nome_servidor, 
      SUM(tempo_downtime) total_downtime, 
      SUM(prejuizo) total_prejuizo 
    FROM View_Downtime_Servidores 
    WHERE id_empresa = ${fkEmpresa}
    GROUP BY fk_servidor
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

function downtimePorDia(fkEmpresa) {
  const query = `
    SELECT 
      SUM(prejuizo) total_prejuizo, 
      DATE(momento) data_downtime 
    FROM View_Downtime_Servidores
    WHERE tempo_downtime != 0 AND id_empresa = ${fkEmpresa}
    GROUP by data_downtime
    ORDER by data_downtime DESC
    LIMIT 7;
  `;

  return database.executar(query);
}

function correlacaoDowntimePrejuizo(idServidor) {
  const query = `
    SELECT 
      SUM(prejuizo) total_prejuizo,
      SUM(tempo_downtime) total_downtime, 
      DATE(momento) data_downtime 
    FROM View_Downtime_Servidores
    WHERE tempo_downtime != 0 AND fk_servidor = ${idServidor}
    GROUP by data_downtime
    ORDER by data_downtime DESC;
  `;

  return database.executar(query);
}

module.exports = {
  popularCards,
  popularTabela,
  downtimePorLocal,
  downtimePorDia,
  correlacaoDowntimePrejuizo,
};
