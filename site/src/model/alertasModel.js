const bancoDados = require("../database/config");

/* ---------------------- DADOS CARDS ---------------------- */
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

// POR SERVIDOR
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

// POR LOCAL
function coletarDadosCardsPorLocal(dataAtual, localServidor) {
  var query = `
    SELECT 
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and local_servidor = '${localServidor}') totalAlertas,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and fk_componente = 1 and local_servidor = '${localServidor}') totalAlertasCpu,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and fk_componente = 2 and local_servidor = '${localServidor}') totalAlertasMemoria,
      (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and fk_componente = 3 and local_servidor = '${localServidor}') totalAlertasDisco
    FROM Eyes_On_Server.Alertas
    LIMIT 1;
    `;
  return bancoDados.executar(query);
}

/* ---------------------- DADOS TIPO ALERTA ---------------------- */
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

// POR COMPONENTE E SERVIDOR
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

// POR COMPONENTE E LOCAL
function coletarDadosTipoAlertaPorComponenteLocal(
  dataAtual,
  fkComponente,
  localServidor
) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

// POR COMPONENTE
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

// POR SERVIDOR
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

// POR LOCAL
function coletarDadosTipoAlertaPorLocal(dataAtual, localServidor) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and local_servidor = '${localServidor}') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and local_servidor = '${localServidor}') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and local_servidor = '${localServidor}') totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

/* ---------------------- RANKING SERVIDORES ---------------------- */
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

// POR COMPONENTE E LOCAL
function realizarRankingLocalComponente(
  idEmpresa,
  dataAtual,
  fkComponente,
  localServidor
) {
  var query = `
        SELECT 
          count(id_alertas) total_alertas,
          nome_servidor,
          id_servidor
        FROM Eyes_On_Server.Servidor s
          JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND 
          a.fk_componente = ${fkComponente} AND
          s.local_servidor = '${localServidor}'
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC
        LIMIT 5;
    `;
  return bancoDados.executar(query);
}

// POR COMPONENTE
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
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND
          a.fk_componente = ${fkComponente}
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC
        LIMIT 5;
    `;
  return bancoDados.executar(query);
}

// POR LOCAL
function realizarRankingServidoresPorLocal(
  idEmpresa,
  dataAtual,
  localServidor
) {
  var query = `
        SELECT 
          count(id_alertas) total_alertas,
          nome_servidor,
          id_servidor
        FROM Eyes_On_Server.Servidor s
          JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND
          s.local_servidor = '${localServidor}'
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC
        LIMIT 5;
    `;
  return bancoDados.executar(query);
}

/* ---------------------- RANKING LOCAIS ---------------------- */
function realizarRankingLocais(idEmpresa, dataAtual) {
  var query = `
    SELECT 
      count(id_alertas) total_alertas,
      local_servidor
    FROM Eyes_On_Server.Servidor s
      JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
    WHERE data_hora_abertura LIKE '${dataAtual}%' AND a.fk_empresa = ${idEmpresa}
    GROUP BY s.local_servidor
    ORDER BY total_alertas DESC
    LIMIT 5;
  `;
  return bancoDados.executar(query);
}

// POR COMPONENTE
function realizarRankingLocaisPorComponente(
  idEmpresa,
  dataAtual,
  fkComponente
) {
  var query = `
    SELECT 
      count(id_alertas) total_alertas,
      local_servidor
    FROM Eyes_On_Server.Servidor s
      JOIN Eyes_On_Server.Alertas a ON a.fk_servidor = s.id_servidor
    WHERE 
      data_hora_abertura LIKE '${dataAtual}%' AND 
      a.fk_empresa = ${idEmpresa} AND
      a.fk_componente = ${fkComponente}
    GROUP BY s.local_servidor
    ORDER BY total_alertas DESC
    LIMIT 5;
  `;
  return bancoDados.executar(query);
}

module.exports = {
  coletarTodosDadosCards,
  coletarDadosCardsPorServidor,
  coletarDadosCardsPorLocal,

  realizarRankingServidores,
  realizarRankingLocalComponente,
  realizarRankingServidoresPorComponente,
  realizarRankingServidoresPorLocal,

  coletarTodosDadosTipoAlerta,
  coletarDadosTipoAlertaPorComponente,
  coletarDadosTipoAlertaPorServidor,
  coletarDadosTipoAlertaPorLocal,
  coletarDadosTipoAlertaPorComponenteServidor,
  coletarDadosTipoAlertaPorComponenteLocal,

  realizarRankingLocais,
  realizarRankingLocaisPorComponente,
};
