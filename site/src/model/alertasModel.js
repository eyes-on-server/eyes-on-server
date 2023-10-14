const bancoDados = require("../database/config");

function coletarTodosAlertas(idEmpresa, dataAtual) {
  var query = `
        SELECT 
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%') totalAlertas,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Prevenção') totalAlertasPrevencao,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Perigo') totalAlertasPerigo,
            (SELECT count(id_alertas) FROM Eyes_On_Server.Alertas where fk_empresa = ${idEmpresa} and data_hora_abertura like '${dataAtual}%' and tipoAlerta = 'Emergência') totalAlertasEmergencia
        FROM Eyes_On_Server.Alertas 
        LIMIT 1;
    `;
  return bancoDados.executar(query);
}

module.exports = {
  coletarTodosAlertas,
};
