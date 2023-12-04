const database = require("../database/config");

function popularTabelaQueda(data, fkEmpresa) {
  const query = `
	SELECT 
        id_servidor, 
        local_servidor,
        nome_servidor, 
        chanceDiaria
      FROM View_PercentQueda_Servidores 
      WHERE id_empresa = ${fkEmpresa} AND dataRegistro = '2023-11-30'
      ORDER BY chanceDiaria DESC;`;

  return database.executar(query);
}

function popularTabelaQuedaPrevisao(data, fkEmpresa) {
  const query = `
	SELECT 
        id_servidor, 
        local_servidor,
        nome_servidor, 
        chancePrevisto
      FROM View_PercentQueda_Servidores 
      WHERE id_empresa = ${fkEmpresa} AND dataRegistro = ${data}
      ORDER BY chancePrevisto DESC;`;

  return database.executar(query);
}

function atualizarKPI( fkEmpresa) {
  const query = `
	SELECT MAX(chanceDiaria) as chanceQueda, MAX(chancePrevisto) as chancePrevista 
FROM View_PercentQueda_Servidores 
WHERE id_empresa = ${fkEmpresa} AND  dataRegistro >= DATEADD(DAY, -30, GETDATE());;`;

  return database.executar(query);
}


function carregarDadosServidorInicio(data, fkEmpresa) {

  
  const query = `

  SELECT chanceDiaria, dataRegistro
FROM View_PercentQueda_Servidores 
WHERE id_empresa = ${fkEmpresa}
AND id_servidor = (SELECT TOP 1 u.id_servidor 
                    FROM View_PercentQueda_Servidores u 
                    INNER JOIN View_PercentQueda_Servidores n ON u.id_servidor = n.id_servidor 
                    WHERE CONVERT(DATE, u.dataRegistro) = ${data} AND u.id_empresa = ${fkEmpresa} 
                    GROUP BY u.id_servidor 
                    ORDER BY MAX(n.chanceDiaria) DESC)
ORDER BY dataRegistro ASC;
  `;
  
  return database.executar(query);
}

function carregarDadosServidor(idServidor, fkEmpresa) {
  const query = `
    SELECT 
    chanceDiaria,
    dataRegistro
  FROM View_PercentQueda_Servidores 
  WHERE id_empresa = ${fkEmpresa} AND id_servidor = ${idServidor}
  ORDER BY dataRegistro ASC;
  `;

  return database.executar(query);
}

function carregarDadosServidorPrevisao(idServidor, fkEmpresa) {
  const query = `
    SELECT 
    chancePrevisto,
    dataRegistro
  FROM View_PercentQueda_Servidores 
  WHERE id_empresa = ${fkEmpresa} AND id_servidor = ${idServidor}
  ORDER BY dataRegistro ASC;
  `;

  return database.executar(query);
}

module.exports = {

  popularTabelaQueda,
  popularTabelaQuedaPrevisao,
  atualizarKPI,
  carregarDadosServidorInicio,
  carregarDadosServidor,
  carregarDadosServidorPrevisao



};