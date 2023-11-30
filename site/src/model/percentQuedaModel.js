const database = require("../database/config");

function popularTabelaQueda() {
  const query = `
	SELECT 
        id_servidor, 
        local_servidor,
        nome_servidor, 
        chanceDiaria
      FROM View_PercentQueda_Servidores 
      WHERE id_empresa = 3 AND dataRegistro = '2023-11-02'
      ORDER BY chanceDiaria DESC;`;

  return database.executar(query);
}

function carregarDadosServidorInicio() {

  
  const query = `
	SELECT chanceDiaria, dataRegistro
  FROM View_PercentQueda_Servidores 
  WHERE id_empresa = 3 
  AND id_servidor = (SELECT u.id_servidor FROM View_PercentQueda_Servidores u 
                    RIGHT JOIN View_PercentQueda_Servidores n ON u.id_servidor = n.id_servidor 
                    WHERE u.dataRegistro = '2023-11-04' GROUP BY u.id_servidor ORDER BY MAX(n.chanceDiaria) DESC
                    LIMIT 1)
  ORDER BY dataRegistro ASC;
  `;
  
  return database.executar(query);
}

function carregarDadosServidor(idServidor) {
  const query = `
    SELECT 
    chanceDiaria,
    dataRegistro
  FROM View_PercentQueda_Servidores 
  WHERE id_empresa = 3 AND id_servidor = ${idServidor}
  ORDER BY dataRegistro ASC;
  `;

  return database.executar(query);
}

module.exports = {

  popularTabelaQueda,
  carregarDadosServidorInicio,
  carregarDadosServidor



};