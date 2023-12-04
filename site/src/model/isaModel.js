const bancoDados = require("../database/config");

//Funcões Locais (não exportará) ---------------
function info(nome_funcao, info_query) {
  console.log(`\n[isa Model] ${nome_funcao} => ${info_query}`);

}

function buscarNomeServidores(company){
  let select = `SELECT local_servidor FROM Servidor WHERE fk_empresa = (SELECT id_empresa FROM Empresa WHERE nome_fantasia = "${company}");`;
  info("selectSectors", select);
  return bancoDados.executar(select);
}

function buscaridServidores(local){
  let select = `SELECT nome_servidor, id_servidor FROM Servidor WHERE local_servidor = "${local}";`;
  info("searchServers", select);
  return bancoDados.executar(select);
}

// Funções para exportar
function buscarConsumo(fk_servidor, company) {
  var query = `
  SELECT 
     AVG(CASE WHEN MONTH(momento) = 1 THEN porcentagem_uso ELSE NULL END) as [media_Janeiro],
     AVG(CASE WHEN MONTH(momento) = 2 THEN porcentagem_uso ELSE NULL END) as [media_Fevereiro],
     AVG(CASE WHEN MONTH(momento) = 3 THEN porcentagem_uso ELSE NULL END) as [media_Março],
     AVG(CASE WHEN MONTH(momento) = 4 THEN porcentagem_uso ELSE NULL END) as [media_Abril],
     AVG(CASE WHEN MONTH(momento) = 5 THEN porcentagem_uso ELSE NULL END) as [media_Maio],
     AVG(CASE WHEN MONTH(momento) = 6 THEN porcentagem_uso ELSE NULL END) as [media_Junho],
     AVG(CASE WHEN MONTH(momento) = 7 THEN porcentagem_uso ELSE NULL END) as [media_Julho],
     AVG(CASE WHEN MONTH(momento) = 8 THEN porcentagem_uso ELSE NULL END) as [media_Agosto],
     AVG(CASE WHEN MONTH(momento) = 9 THEN porcentagem_uso ELSE NULL END) as [media_Setembro],
     AVG(CASE WHEN MONTH(momento) = 10 THEN porcentagem_uso ELSE NULL END) as [media_Outubro],
     AVG(CASE WHEN MONTH(momento) = 11 THEN porcentagem_uso ELSE NULL END) as [media_Novembro],
     AVG(CASE WHEN MONTH(momento) = 12 THEN porcentagem_uso ELSE NULL END) as [media_Dezembro]
   FROM Eyes_On_Server.Consumo_Servidor CS
   JOIN Eyes_On_Server.Servidor S ON CS.fk_servidor = S.id_servidor
   WHERE S.fk_empresa = @company
     AND YEAR(momento) = YEAR(GETDATE())
   GROUP BY S.id_servidor;
  `;

  info("buscarConsumo()", query);

  return bancoDados.executar(query);
}

function buscarPrevisaoConsumo() {
  var query = `
  SELECT 
    AVG(CASE WHEN mes_feriado LIKE 'Janeiro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Janeiro,
    AVG(CASE WHEN mes_feriado LIKE 'Fevereiro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Fevereiro,
    AVG(CASE WHEN mes_feriado LIKE 'Março' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Março,
    AVG(CASE WHEN mes_feriado LIKE 'Abril' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Abril,
    AVG(CASE WHEN mes_feriado LIKE 'Maio' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Maio,
    AVG(CASE WHEN mes_feriado LIKE 'Junho' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Junho,
    AVG(CASE WHEN mes_feriado LIKE 'Julho' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Julho,
    AVG(CASE WHEN mes_feriado LIKE 'Agosto' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Agosto,
    AVG(CASE WHEN mes_feriado LIKE 'Setembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Setembro,
    AVG(CASE WHEN mes_feriado LIKE 'Outubro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Outubro,
    AVG(CASE WHEN mes_feriado LIKE 'Novembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Novembro,
      AVG(CASE WHEN mes_feriado LIKE 'Dezembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Dezembro
 FROM Eyes_On_Server.E_Comerce
 GROUP BY fk_servidor;
  `;

  info("buscarPrevisaoConsumo()", query);

  return bancoDados.executar(query);
}



module.exports = {
  buscarConsumo,
  buscarPrevisaoConsumo,
  buscarNomeServidores,
  buscaridServidores
};

// ------------------------------------ SQL SERVER
// function buscarQtdServidores(parametro){
//   var query = `
//   SELECT COUNT(id_servidor) AS TotalServidores FROM Eyes_On_Server.Servidor WHERE fk_empresa = @parametro
//   `;

//   info("buscarQtdServidores()", query);

//   return bancoDados.executar(query);
// }

// function buscarConsumo(parametro, i) {
//   var query = `
//   SELECT 
//   AVG(CASE WHEN MONTH(momento) = 1 THEN porcentagem_uso ELSE NULL END) as [média Janeiro],
//   AVG(CASE WHEN MONTH(momento) = 2 THEN porcentagem_uso ELSE NULL END) as [média Fevereiro],
//   AVG(CASE WHEN MONTH(momento) = 3 THEN porcentagem_uso ELSE NULL END) as [média Março],
//   AVG(CASE WHEN MONTH(momento) = 4 THEN porcentagem_uso ELSE NULL END) as [média Abril],
//   AVG(CASE WHEN MONTH(momento) = 5 THEN porcentagem_uso ELSE NULL END) as [média Maio],
//   AVG(CASE WHEN MONTH(momento) = 6 THEN porcentagem_uso ELSE NULL END) as [média Junho],
//   AVG(CASE WHEN MONTH(momento) = 7 THEN porcentagem_uso ELSE NULL END) as [média Julho],
//   AVG(CASE WHEN MONTH(momento) = 8 THEN porcentagem_uso ELSE NULL END) as [média Agosto],
//   AVG(CASE WHEN MONTH(momento) = 9 THEN porcentagem_uso ELSE NULL END) as [média Setembro],
//   AVG(CASE WHEN MONTH(momento) = 10 THEN porcentagem_uso ELSE NULL END) as [média Outubro],
//   AVG(CASE WHEN MONTH(momento) = 11 THEN porcentagem_uso ELSE NULL END) as [média Novembro],
//   AVG(CASE WHEN MONTH(momento) = 12 THEN porcentagem_uso ELSE NULL END) as [média Dezembro]
// FROM Eyes_On_Server.Consumo_Servidor CS
// JOIN Eyes_On_Server.Servidor S ON CS.fk_servidor = S.id_servidor
// WHERE S.fk_empresa = @parametro
//   AND YEAR(momento) = YEAR(GETDATE())
// GROUP BY S.id_servidor;
//   `;

//   info("buscarConsumo()", query);

//   return bancoDados.executar(query);
// }


// function buscarPrevisaoConsumo() {
//   var query = `
//   SELECT 
//    AVG(CASE WHEN mes_feriado LIKE 'Janeiro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Janeiro,
//    AVG(CASE WHEN mes_feriado LIKE 'Fevereiro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Fevereiro,
//    AVG(CASE WHEN mes_feriado LIKE 'Março' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Março,
//    AVG(CASE WHEN mes_feriado LIKE 'Abril' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Abril,
//    AVG(CASE WHEN mes_feriado LIKE 'Maio' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Maio,
//    AVG(CASE WHEN mes_feriado LIKE 'Junho' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Junho,
//    AVG(CASE WHEN mes_feriado LIKE 'Julho' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Julho,
//    AVG(CASE WHEN mes_feriado LIKE 'Agosto' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Agosto,
//    AVG(CASE WHEN mes_feriado LIKE 'Setembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Setembro,
//    AVG(CASE WHEN mes_feriado LIKE 'Outubro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Outubro,
//    AVG(CASE WHEN mes_feriado LIKE 'Novembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Novembro,
//    AVG(CASE WHEN mes_feriado LIKE 'Dezembro' THEN valor_prioridade ELSE NULL END) as qtd_feriados_Dezembro
// FROM Eyes_On_Server.E_Comerce
// GROUP BY fk_servidor;

//   `;

//   info("buscarPrevisaoConsumo()", query);

//   return bancoDados.executar(query);
// }

