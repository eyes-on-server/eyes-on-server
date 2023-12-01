const bancoDeDados = require("../database/config");

function info(function_name, info_query) {
  console.log(
    `\nModel --> analystGraphModel: ${function_name} --> ${info_query}`
  );
}

function selectSectors(company) {
  let select = `SELECT local_servidor FROM Eyes_On_Server.Servidor WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");`;
  info("selectSectors", select);
  return bancoDeDados.executar(select);
}

function searchServers(local) {
  let select = `SELECT nome_servidor FROM Eyes_On_Server.Servidor WHERE local_servidor = "${local}";`;
  info("searchServers", select);
  return bancoDeDados.executar(select);
}

function searchAllAlerts(company) {
  let select = `SELECT count(id_alertas) as Alerts FROM Eyes_On_Server.Alertas WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");`;
  info("searchAllAlerts", select);
  return bancoDeDados.executar(select);
}

function searchCpuAlerts(company) {
  let select = `SELECT count(id_alertas) as cpuAlerts FROM Eyes_On_Server.Alertas WHERE fk_componente = 1 and fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");  `;
  info("searchCpuAlerts", select);
  return bancoDeDados.executar(select);
}

function searchDiscAlerts(company) {
  let select = `SELECT count(id_alertas) as discAlerts FROM Eyes_On_Server.Alertas WHERE fk_componente = 2 and fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");  `;
  info("searchCpuAlerts", select);
  return bancoDeDados.executar(select);
}

function searchMemoryAlerts(company) {
  let select = `SELECT count(id_alertas) as memoryAlerts FROM Eyes_On_Server.Alertas WHERE fk_componente = 3 and fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");  `;
  info("searchMemoryAlerts", select);
  return bancoDeDados.executar(select);
}

function searchLastAlertsByCPU(company) {
  let select = `SELECT titulo_alerta, descricao_alerta, data_hora_abertura, tipoAlerta FROM Eyes_On_Server.Alertas WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}" AND fk_componente = 1) ORDER BY  data_hora_abertura DESC LIMIT 1; `;
  info("searchLastAlertsByCPU", select);
  return bancoDeDados.executar(select);
}

function searchLastAlertsByMemory(company) {
  let select = `SELECT titulo_alerta, descricao_alerta, data_hora_abertura, tipoAlerta FROM Eyes_On_Server.Alertas WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}" AND fk_componente = 2) ORDER BY  data_hora_abertura DESC LIMIT 1; `;
  info("searchLastAlertsByMemory", select);
  return bancoDeDados.executar(select);
}

function searchLastAlertsByDisc(company) {
  let select = `SELECT titulo_alerta, descricao_alerta, data_hora_abertura, tipoAlerta FROM Eyes_On_Server.Alertas WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}" AND fk_componente = 3) ORDER BY  data_hora_abertura DESC LIMIT 1; `;
  info("searchLastAlertsByDisc", select);
  return bancoDeDados.executar(select);
}

function searchServerInformation(server) {
  let select = `SELECT nome_servidor, local_servidor, ipv6_servidor, mac_address, so_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}";`;
  info("searchServerInformation", select);
  return bancoDeDados.executar(select);
}

function searchDatasInLive(server, componentID) {
  let select = `
  SELECT valor_registro FROM Eyes_On_Server.Registro AS r
	JOIN Eyes_On_Server.Componente_Servidor AS cs
    ON  r.fk_componente_servidor = cs.id_componente_servidor
    AND cs.fk_servidor = (SELECT id_Servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}")
    AND  fk_componente_medida = ${componentID} ORDER BY r.momento_registro DESC LIMIT 1;
  `;
  info("searchDatasInLive", select);
  return bancoDeDados.executar(select);
}

function searchAlertsByServer(server) {
  let select = `SELECT count(id_alertas) AS alerts FROM Eyes_On_Server.Alertas WHERE fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}");`;
  info("searchAlertsByServer", select);
  return bancoDeDados.executar(select);
}

function searchAlertsByComponent(server, componentId) {
  let select = `SELECT count(id_alertas) AS alerts FROM Eyes_On_Server.Alertas WHERE fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}") AND fk_componente = ${componentId};`;
  info("searchAlertsByComponent", select);
  return bancoDeDados.executar(select);
}

function searchLastAlertsByComponents(server, componentId) {
  let select = `SELECT titulo_alerta, descricao_alerta, data_hora_abertura, tipoAlerta FROM Eyes_On_Server.Alertas WHERE fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}" AND fk_componente = ${componentId}) ORDER BY  data_hora_abertura DESC LIMIT 1`;
  info("searchLastAlertsByComponents", select);
  return bancoDeDados.executar(select);
}

function searchDatasForLineGraph(server, componentId) {
  let select = `SELECT valor_registro, momento_registro  FROM Eyes_On_Server.Registro  as R
	JOIN Eyes_On_Server.Componente_Servidor as CS
    ON R.fk_componente_servidor = CS.id_componente_servidor
    WHERE CS.fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}")
    AND CS.fk_componente_medida = ${componentId} ORDER BY R.momento_registro DESC LIMIT 10;`;
  info("searchDatasForLineGraph", select);
  return bancoDeDados.executar(select);
}

function searchComponents(server) {
  let select = `SELECT nome_componente_medida FROM Eyes_On_Server.Componente_Medida AS CM
	JOIN Eyes_On_Server.Componente_Servidor AS CS 
    ON CM.id_componente_medida = CS.fk_componente_medida
    WHERE CS.fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}");`;
  info("searchComponents", select);
  return bancoDeDados.executar(select);
}

function searchDatasByComponent(server, measureName) {
  let select = `
  SELECT valor_registro, momento_registro  FROM Eyes_On_Server.Registro  as R
	JOIN Eyes_On_Server.Componente_Servidor as CS
    ON R.fk_componente_servidor = CS.id_componente_servidor
    WHERE CS.fk_servidor = (SELECT id_servidor FROM Eyes_On_Server.Servidor WHERE nome_servidor = "${server}")
    AND CS.fk_componente_medida = (SELECT id_componente_medida FROM Eyes_On_Server.Componente_Medida WHERE nome_componente_medida = "${measureName}" ) 
    ORDER BY R.momento_registro DESC LIMIT 10;
  `;
  info("searchDatasByComponent", select);
  return bancoDeDados.executar(select);
}

module.exports = {
  selectSectors,
  searchServers,
  searchAllAlerts,
  searchCpuAlerts,
  searchDiscAlerts,
  searchMemoryAlerts,
  searchLastAlertsByCPU,
  searchLastAlertsByMemory,
  searchLastAlertsByDisc,
  searchServerInformation,
  searchDatasInLive,
  searchAlertsByServer,
  searchAlertsByComponent,
  searchLastAlertsByComponents,
  searchDatasForLineGraph,
  searchComponents,
  searchDatasByComponent,
};
