const bancoDados = require("../database/config");

function coletarAlertasComponentes(idEmpresa, dataAtual) {
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

module.exports = {
  coletarAlertasComponentes,
};
