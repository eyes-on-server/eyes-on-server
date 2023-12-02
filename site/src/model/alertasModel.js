const bancoDados = require("../database/config");

/* ---------------------- DADOS CARDS ---------------------- */
function coletarTodosDadosCards(idEmpresa, dataAtual) {
  var query = `
    SELECT 
      COUNT(id_alertas) totalAlertas,
      COALESCE(SUM(alerta_cpu),0) totalAlertasCpu,
      COALESCE(SUM(alerta_memoria),0) totalAlertasMemoria,
      COALESCE(SUM(alerta_disco),0) totalAlertasDisco
    FROM View_Tipo_Alerta 
    WHERE 
	    fk_empresa = ${idEmpresa} AND 
      data_hora_abertura LIKE '${dataAtual}%';
    `;
  return bancoDados.executar(query);
}

// POR SERVIDOR
function coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor) {
  var query = `
  SELECT 
    COUNT(id_alertas) totalAlertas,
    COALESCE(SUM(alerta_cpu),0) totalAlertasCpu,
    COALESCE(SUM(alerta_memoria),0) totalAlertasMemoria,
    COALESCE(SUM(alerta_disco),0) totalAlertasDisco
  FROM View_Tipo_Alerta 
  WHERE 
    fk_empresa = ${idEmpresa} AND 
    data_hora_abertura LIKE '${dataAtual}%' AND
    fk_servidor = ${fkServidor};
  `;
  return bancoDados.executar(query);
}

// POR LOCAL
function coletarDadosCardsPorLocal(dataAtual, localServidor) {
  var query = `
  SELECT 
    COUNT(id_alertas) totalAlertas,
    COALESCE(SUM(alerta_cpu),0) totalAlertasCpu,
    COALESCE(SUM(alerta_memoria),0) totalAlertasMemoria,
    COALESCE(SUM(alerta_disco),0) totalAlertasDisco
  FROM View_Tipo_Alerta 
  WHERE 
    data_hora_abertura LIKE '${dataAtual}%' AND
    local_servidor = '${localServidor}';
  `;
  return bancoDados.executar(query);
}

// POR RISCO
function coletarDadosCardsPorRisco(idEmpresa, dataAtual, risco) {
  var query = `
    SELECT 
      (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.view_riscos_servidores on fk_servidor = id_servidor where nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}' and data_hora_abertura LIKE '${dataAtual}%') totalAlertas,
      (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.view_riscos_servidores on fk_servidor = id_servidor where fk_componente = 1 and nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}' and data_hora_abertura LIKE '${dataAtual}%') totalAlertasCpu,
      (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.view_riscos_servidores on fk_servidor = id_servidor where fk_componente = 2 and nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}' and data_hora_abertura LIKE '${dataAtual}%') totalAlertasMemoria,
      (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.view_riscos_servidores on fk_servidor = id_servidor where fk_componente = 3 and nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}' and data_hora_abertura LIKE '${dataAtual}%') totalAlertasDisco
    FROM View_Alertas WHERE fk_empresa = ${idEmpresa}
    LIMIT 1;
    `;
  return bancoDados.executar(query);
}

/* ---------------------- DADOS TIPO ALERTA ---------------------- */
function coletarTodosDadosTipoAlerta(idEmpresa, dataAtual) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência') totalAlertasEmergencia
        FROM View_Alertas 
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
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasEmergencia
        FROM View_Alertas 
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
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasEmergencia
        FROM View_Alertas 
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
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente}) totalAlertasEmergencia
        FROM View_Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

// POR SERVIDOR
function coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and fk_servidor = ${fkServidor}) totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and fk_servidor = ${fkServidor}) totalAlertasEmergencia
        FROM View_Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

// POR LOCAL
function coletarDadosTipoAlertaPorLocal(dataAtual, localServidor) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção' and local_servidor = '${localServidor}') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo' and local_servidor = '${localServidor}') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência' and local_servidor = '${localServidor}') totalAlertasEmergencia
        FROM View_Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

// POR RISCO
function coletarDadosTipoAlertaPorRisco(idEmpresa, risco) {
  var query = `
      SELECT
        sum(qtd_alertas_prevencao) totalAlertasPrevencao,
        sum(qtd_alertas_perigo) totalAlertasPerigo,
        sum(qtd_alertas_emergencia) totalAlertasEmergencia
      FROM Eyes_On_Server.view_riscos_servidores 
        WHERE fk_empresa = ${idEmpresa} AND nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}';
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
      JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
    WHERE data_hora_abertura LIKE '${dataAtual}%' AND a.fk_empresa = ${idEmpresa}
    GROUP BY a.fk_servidor
    ORDER BY total_alertas DESC;
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
          JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND 
          a.fk_componente = ${fkComponente} AND
          s.local_servidor = '${localServidor}'
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC;
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
          JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND
          a.fk_componente = ${fkComponente}
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC;
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
          JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
        WHERE 
          data_hora_abertura LIKE '${dataAtual}%' AND 
          a.fk_empresa = ${idEmpresa} AND
          s.local_servidor = '${localServidor}'
        GROUP BY a.fk_servidor
        ORDER BY total_alertas DESC;
    `;
  return bancoDados.executar(query);
}

// POR RISCO
function realizarRankingServidoresPorRisco(idEmpresa, risco) {
  var query = `
      SELECT 
        vr.total_alertas,
        s.nome_servidor,
        vr.id_servidor
      FROM Eyes_On_Server.Servidor s
        JOIN Eyes_On_Server.view_riscos_servidores vr ON vr.id_servidor = s.id_servidor
      WHERE 
        vr.fk_empresa = ${idEmpresa} AND
        vr.nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}'
      ORDER BY vr.total_alertas DESC;
    `;
  return bancoDados.executar(query);
}

/* ---------------------- OBTER RISCOS ---------------------- */
function obterRiscosGeral(idEmpresa) {
  var query = `
        SELECT 
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Sem riscos") qtdSemRiscos,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Baixo") qtdRiscoMuitoBaixo,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Baixo") qtdRiscoBaixo,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Moderado") qtdRiscoModerado,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Alto") qtdRiscoAlto,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Alto") qtdRiscoMuitoAlto,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Máximo") qtdRiscoMaximo,
          (SELECT count(id_servidor) FROM Eyes_On_Server.view_riscos_servidores) totalServidores
        FROM Eyes_On_Server.view_riscos_servidores WHERE fk_empresa = ${idEmpresa}
        LIMIT 1; 
    `;
  return bancoDados.executar(query);
}

function obterRiscosPorLocal(idEmpresa, localServidor) {
  var query = `
        SELECT 
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Sem riscos" AND local_servidor = '${localServidor}') qtdSemRiscos,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Baixo" AND local_servidor = '${localServidor}') qtdRiscoMuitoBaixo,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Baixo" AND local_servidor = '${localServidor}') qtdRiscoBaixo,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Moderado" AND local_servidor = '${localServidor}') qtdRiscoModerado,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Alto" AND local_servidor = '${localServidor}') qtdRiscoAlto,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Alto" AND local_servidor = '${localServidor}') qtdRiscoMuitoAlto,
          (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Máximo" AND local_servidor = '${localServidor}') qtdRiscoMaximo,
          (SELECT count(id_servidor) FROM Eyes_On_Server.view_riscos_servidores WHERE local_servidor = '${localServidor}') totalServidores
        FROM Eyes_On_Server.view_riscos_servidores WHERE fk_empresa = ${idEmpresa}
        LIMIT 1; 
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
      JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
    WHERE data_hora_abertura LIKE '${dataAtual}%' AND a.fk_empresa = ${idEmpresa}
    GROUP BY s.local_servidor
    ORDER BY total_alertas DESC;
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
      JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
    WHERE 
      data_hora_abertura LIKE '${dataAtual}%' AND 
      a.fk_empresa = ${idEmpresa} AND
      a.fk_componente = ${fkComponente}
    GROUP BY s.local_servidor
    ORDER BY total_alertas DESC;
  `;
  return bancoDados.executar(query);
}

module.exports = {
  coletarTodosDadosCards,
  coletarDadosCardsPorServidor,
  coletarDadosCardsPorLocal,
  coletarDadosCardsPorRisco,

  realizarRankingServidores,
  realizarRankingLocalComponente,
  realizarRankingServidoresPorComponente,
  realizarRankingServidoresPorLocal,
  realizarRankingServidoresPorRisco,

  obterRiscosGeral,
  obterRiscosPorLocal,

  coletarTodosDadosTipoAlerta,
  coletarDadosTipoAlertaPorComponente,
  coletarDadosTipoAlertaPorServidor,
  coletarDadosTipoAlertaPorLocal,
  coletarDadosTipoAlertaPorComponenteServidor,
  coletarDadosTipoAlertaPorComponenteLocal,
  coletarDadosTipoAlertaPorRisco,

  realizarRankingLocais,
  realizarRankingLocaisPorComponente,
};

// Comandos SQL SERVER

/* ---------------------- DADOS CARDS ---------------------- */
// function coletarTodosDadosCards(idEmpresa, dataAtual) {
//   var query = `
//     SELECT
//       COUNT(id_alertas) AS totalAlertas,
//       COALESCE(SUM(alerta_cpu), 0) AS totalAlertasCpu,
//       COALESCE(SUM(alerta_memoria), 0) AS totalAlertasMemoria,
//       COALESCE(SUM(alerta_disco), 0) AS totalAlertasDisco
//     FROM View_Tipo_Alerta
//     WHERE
//       fk_empresa = ${idEmpresa} AND
//       CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%';
//     `;
//   return bancoDados.executar(query);
// }

// // POR SERVIDOR
// function coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor) {
//   var query = `
//   SELECT
//     COUNT(id_alertas) totalAlertas,
//     COALESCE(SUM(alerta_cpu),0) totalAlertasCpu,
//     COALESCE(SUM(alerta_memoria),0) totalAlertasMemoria,
//     COALESCE(SUM(alerta_disco),0) totalAlertasDisco
//   FROM View_Tipo_Alerta
//   WHERE
//     fk_empresa = ${idEmpresa} AND
//     CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%' AND
//     fk_servidor = ${fkServidor};
//   `;
//   return bancoDados.executar(query);
// }

// // POR LOCAL
// function coletarDadosCardsPorLocal(dataAtual, localServidor) {
//   var query = `
//   SELECT
//     COUNT(id_alertas) totalAlertas,
//     COALESCE(SUM(alerta_cpu),0) totalAlertasCpu,
//     COALESCE(SUM(alerta_memoria),0) totalAlertasMemoria,
//     COALESCE(SUM(alerta_disco),0) totalAlertasDisco
//   FROM View_Tipo_Alerta
//   WHERE
//     CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%' AND
//     local_servidor = '${localServidor}';
//   `;
//   return bancoDados.executar(query);
// }

// // POR RISCO
// function coletarDadosCardsPorRisco(idEmpresa, dataAtual, risco) {
//   var query = `
//     SELECT TOP 1
//       (SELECT COUNT(id_alertas) FROM View_Alertas
//       JOIN Eyes_On_Server.view_riscos_servidores ON fk_servidor = id_servidor
//       WHERE nivel_de_risco COLLATE Latin1_General_CI_AI = '${risco}' AND CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%'
//       ) AS totalAlertas,

//       (SELECT COUNT(id_alertas) FROM View_Alertas
//       JOIN Eyes_On_Server.view_riscos_servidores ON fk_servidor = id_servidor
//       WHERE fk_componente = 1 AND nivel_de_risco COLLATE Latin1_General_CI_AI = ${risco} AND CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%'
//       ) AS totalAlertasCpu,

//       (SELECT COUNT(id_alertas) FROM View_Alertas
//       JOIN Eyes_On_Server.view_riscos_servidores ON fk_servidor = id_servidor
//       WHERE fk_componente = 2 AND nivel_de_risco COLLATE Latin1_General_CI_AI = '${risco}' AND CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%'
//       ) AS totalAlertasMemoria,

//       (SELECT COUNT(id_alertas) FROM View_Alertas
//       JOIN Eyes_On_Server.view_riscos_servidores ON fk_servidor = id_servidor
//       WHERE fk_componente = 3 AND nivel_de_risco COLLATE Latin1_General_CI_AI = '${risco}' AND CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}%'
//       ) AS totalAlertasDisco
//     FROM View_Alertas
//     WHERE fk_empresa = ${idEmpresa};
//     `;
//   return bancoDados.executar(query);
// }

// /* ---------------------- DADOS TIPO ALERTA ---------------------- */
// function coletarTodosDadosTipoAlerta(idEmpresa, dataAtual) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção') totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo') totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência') totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE E SERVIDOR
// function coletarDadosTipoAlertaPorComponenteServidor(
//   idEmpresa,
//   dataAtual,
//   fkComponente,
//   fkServidor
// ) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and fk_servidor = ${fkServidor}) totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE E LOCAL
// function coletarDadosTipoAlertaPorComponenteLocal(
//   dataAtual,
//   fkComponente,
//   localServidor
// ) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente} and local_servidor = '${localServidor}') totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE
// function coletarDadosTipoAlertaPorComponente(
//   idEmpresa,
//   dataAtual,
//   fkComponente
// ) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção' and fk_componente = ${fkComponente}) totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo' and fk_componente = ${fkComponente}) totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência' and fk_componente = ${fkComponente}) totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR SERVIDOR
// function coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção' and fk_servidor = ${fkServidor}) totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo' and fk_servidor = ${fkServidor}) totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas where fk_empresa = ${idEmpresa} and CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência' and fk_servidor = ${fkServidor}) totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR LOCAL
// function coletarDadosTipoAlertaPorLocal(dataAtual, localServidor) {
//   var query = `
//         SELECT TOP 1
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Prevenção' and local_servidor = '${localServidor}') totalAlertasPrevencao,
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Perigo' and local_servidor = '${localServidor}') totalAlertasPerigo,
//             (SELECT count(id_alertas) FROM View_Alertas JOIN Eyes_On_Server.Servidor on fk_servidor = id_servidor where CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% and tipoAlerta = 'Emergência' and local_servidor = '${localServidor}') totalAlertasEmergencia
//         FROM View_Alertas;
//     `;
//   return bancoDados.executar(query);
// }

// // POR RISCO
// function coletarDadosTipoAlertaPorRisco(idEmpresa, risco) {
//   var query = `
//       SELECT
//         sum(qtd_alertas_prevencao) totalAlertasPrevencao,
//         sum(qtd_alertas_perigo) totalAlertasPerigo,
//         sum(qtd_alertas_emergencia) totalAlertasEmergencia
//       FROM Eyes_On_Server.view_riscos_servidores
//         WHERE fk_empresa = ${idEmpresa} AND nivel_de_risco COLLATE Latin1_General_CI_AI = '${risco}';
//     `;
//   return bancoDados.executar(query);
// }

// /* ---------------------- RANKING SERVIDORES ---------------------- */
// function realizarRankingServidores(idEmpresa, dataAtual) {
//   var query = `
//     SELECT
//       count(id_alertas) total_alertas,
//       nome_servidor,
//       id_servidor
//     FROM Eyes_On_Server.Servidor s
//       JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//     WHERE CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND a.fk_empresa = ${idEmpresa}
//     GROUP BY a.fk_servidor
//     ORDER BY total_alertas DESC;
//   `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE E LOCAL
// function realizarRankingLocalComponente(
//   idEmpresa,
//   dataAtual,
//   fkComponente,
//   localServidor
// ) {
//   var query = `
//         SELECT
//           count(id_alertas) total_alertas,
//           nome_servidor,
//           id_servidor
//         FROM Eyes_On_Server.Servidor s
//           JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//         WHERE
//           CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND
//           a.fk_empresa = ${idEmpresa} AND
//           a.fk_componente = ${fkComponente} AND
//           s.local_servidor = '${localServidor}'
//         GROUP BY a.fk_servidor
//         ORDER BY total_alertas DESC;
//     `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE
// function realizarRankingServidoresPorComponente(
//   idEmpresa,
//   dataAtual,
//   fkComponente
// ) {
//   var query = `
//         SELECT
//           count(id_alertas) total_alertas,
//           nome_servidor,
//           id_servidor
//         FROM Eyes_On_Server.Servidor s
//           JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//         WHERE
//           CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND
//           a.fk_empresa = ${idEmpresa} AND
//           a.fk_componente = ${fkComponente}
//         GROUP BY a.fk_servidor
//         ORDER BY total_alertas DESC;
//     `;
//   return bancoDados.executar(query);
// }

// // POR LOCAL
// function realizarRankingServidoresPorLocal(
//   idEmpresa,
//   dataAtual,
//   localServidor
// ) {
//   var query = `
//         SELECT
//           count(id_alertas) total_alertas,
//           nome_servidor,
//           id_servidor
//         FROM Eyes_On_Server.Servidor s
//           JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//         WHERE
//           CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND
//           a.fk_empresa = ${idEmpresa} AND
//           s.local_servidor = '${localServidor}'
//         GROUP BY a.fk_servidor
//         ORDER BY total_alertas DESC;
//     `;
//   return bancoDados.executar(query);
// }

// // POR RISCO
// function realizarRankingServidoresPorRisco(idEmpresa, risco) {
//   var query = `
//       SELECT
//         vr.total_alertas,
//         s.nome_servidor,
//         vr.id_servidor
//       FROM Eyes_On_Server.Servidor s
//         JOIN Eyes_On_Server.view_riscos_servidores vr ON vr.id_servidor = s.id_servidor
//       WHERE
//         vr.fk_empresa = ${idEmpresa} AND
//         vr.nivel_de_risco COLLATE utf8mb4_unicode_ci = '${risco}'
//       ORDER BY vr.total_alertas DESC;
//     `;
//   return bancoDados.executar(query);
// }

// /* ---------------------- OBTER RISCOS ---------------------- */
// function obterRiscosGeral(idEmpresa) {
//   var query = `
//         SELECT TOP 1
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Sem riscos") qtdSemRiscos,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Baixo") qtdRiscoMuitoBaixo,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Baixo") qtdRiscoBaixo,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Moderado") qtdRiscoModerado,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Alto") qtdRiscoAlto,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Alto") qtdRiscoMuitoAlto,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Máximo") qtdRiscoMaximo,
//           (SELECT count(id_servidor) FROM Eyes_On_Server.view_riscos_servidores) totalServidores
//         FROM Eyes_On_Server.view_riscos_servidores WHERE fk_empresa = ${idEmpresa};
//     `;
//   return bancoDados.executar(query);
// }

// function obterRiscosPorLocal(idEmpresa, localServidor) {
//   var query = `
//         SELECT TOP 1
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Sem riscos" AND local_servidor = '${localServidor}') qtdSemRiscos,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Baixo" AND local_servidor = '${localServidor}') qtdRiscoMuitoBaixo,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Baixo" AND local_servidor = '${localServidor}') qtdRiscoBaixo,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Moderado" AND local_servidor = '${localServidor}') qtdRiscoModerado,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Alto" AND local_servidor = '${localServidor}') qtdRiscoAlto,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Muito Alto" AND local_servidor = '${localServidor}') qtdRiscoMuitoAlto,
//           (SELECT count(nivel_de_risco) FROM Eyes_On_Server.view_riscos_servidores WHERE nivel_de_risco COLLATE utf8mb4_unicode_ci = "Risco Máximo" AND local_servidor = '${localServidor}') qtdRiscoMaximo,
//           (SELECT count(id_servidor) FROM Eyes_On_Server.view_riscos_servidores WHERE local_servidor = '${localServidor}') totalServidores
//         FROM Eyes_On_Server.view_riscos_servidores WHERE fk_empresa = ${idEmpresa};
//     `;
//   return bancoDados.executar(query);
// }

// /* ---------------------- RANKING LOCAIS ---------------------- */
// function realizarRankingLocais(idEmpresa, dataAtual) {
//   var query = `
//     SELECT
//       count(id_alertas) total_alertas,
//       local_servidor
//     FROM Eyes_On_Server.Servidor s
//       JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//     WHERE CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND a.fk_empresa = ${idEmpresa}
//     GROUP BY s.local_servidor
//     ORDER BY total_alertas DESC;
//   `;
//   return bancoDados.executar(query);
// }

// // POR COMPONENTE
// function realizarRankingLocaisPorComponente(
//   idEmpresa,
//   dataAtual,
//   fkComponente
// ) {
//   var query = `
//     SELECT
//       count(id_alertas) total_alertas,
//       local_servidor
//     FROM Eyes_On_Server.Servidor s
//       JOIN View_Alertas a ON a.fk_servidor = s.id_servidor
//     WHERE
//       CONVERT(VARCHAR, data_hora_abertura, 23) LIKE '${dataAtual}% AND
//       a.fk_empresa = ${idEmpresa} AND
//       a.fk_componente = ${fkComponente}
//     GROUP BY s.local_servidor
//     ORDER BY total_alertas DESC;
//   `;
//   return bancoDados.executar(query);
// }

// module.exports = {
//   coletarTodosDadosCards,
//   coletarDadosCardsPorServidor,
//   coletarDadosCardsPorLocal,
//   coletarDadosCardsPorRisco,

//   realizarRankingServidores,
//   realizarRankingLocalComponente,
//   realizarRankingServidoresPorComponente,
//   realizarRankingServidoresPorLocal,
//   realizarRankingServidoresPorRisco,

//   obterRiscosGeral,
//   obterRiscosPorLocal,

//   coletarTodosDadosTipoAlerta,
//   coletarDadosTipoAlertaPorComponente,
//   coletarDadosTipoAlertaPorServidor,
//   coletarDadosTipoAlertaPorLocal,
//   coletarDadosTipoAlertaPorComponenteServidor,
//   coletarDadosTipoAlertaPorComponenteLocal,
//   coletarDadosTipoAlertaPorRisco,

//   realizarRankingLocais,
//   realizarRankingLocaisPorComponente,
// };
