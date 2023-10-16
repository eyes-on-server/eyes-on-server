const bancoDados = require("../database/config");

function coletarTodosDadosCards(idEmpresa, dataAtual) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%') totalAlertas,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 1) totalAlertasCpu,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 2) totalAlertasMemoria,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 3) totalAlertasDisco
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function coletarTodosDadosTipoAlerta(idEmpresa, dataAtual) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência') totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function realizarRankingServidores(idEmpresa, dataAtual) {
  var query = `
    SELECT 
      count(id_alertas) total_alertas,
      nome_servidor,
      id_servidor
    FROM Eyes_On_Server.Servidor s
      JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
    WHERE data_hora_abertura LIKE '${dataAtual}%' AND a.fk_empresa = ${idEmpresa}
    GROUP BY a.fk_servidor
    ORDER BY total_alertas DESC
    LIMIT 5;
  `;
  return bancoDados.executar(query);
}

function coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor) {
  var query = `
    SELECT 
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_servidor = ${fkServidor}) totalAlertas,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 1 and fk_servidor = ${fkServidor}) totalAlertasCpu,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 2 and fk_servidor = ${fkServidor}) totalAlertasMemoria,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and fk_componente = 3 and fk_servidor = ${fkServidor}) totalAlertasDisco
    FROM Eyes_On_Server.Alertas
    LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function coletarDadosTipoAlertaPorComponenteServidor(
  idEmpresa,
  dataAtual,
  fkComponente,
  fkServidor
) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function coletarDadosTipoAlertaPorComponente(
  idEmpresa,
  dataAtual,
  fkComponente
) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente}) totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_servidor = ${fkServidor}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_servidor = ${fkServidor}) totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

function realizarRankingServidoresPorComponente(
  idEmpresa,
  dataAtual,
  fkComponente
) {
  var query = `
        SELECT 
          count(id_alertas) total_alertas,
          nome_servidor,
          id_servidor
        FROM Eyes_On_Server.Servidor s
          JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
        WHERE data_hora_abertura LIKE '${dataAtual}%' AND a.fk_empresa = ${idEmpresa} and a.fk_componente = ${fkComponente}
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC
        LIMIT 5;
    `;
  return bancoDados.executar(query);
}
module.exports = {
  coletarTodosDadosCards,
  coletarTodosDadosTipoAlerta,
  realizarRankingServidores,
  coletarDadosCardsPorServidor,
  coletarDadosTipoAlertaPorComponente,
  realizarRankingServidoresPorComponente,
  coletarDadosTipoAlertaPorServidor,
  coletarDadosTipoAlertaPorComponenteServidor,
};
