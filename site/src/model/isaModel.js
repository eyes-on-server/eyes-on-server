const bancoDados = require("../database/config");

//Funcões Locais (não exportará) ---------------
function info(nome_funcao, info_query) {
  console.log(`\n[isa Model] ${nome_funcao} => ${info_query}`);

}

function buscarNomeServidores(company){
  let select = `SELECT local_servidor FROM Eyes_On_Server.Servidor WHERE fk_empresa = (SELECT id_empresa FROM Eyes_On_Server.Empresa WHERE nome_fantasia = "${company}");`;
  info("selectSectors", select);
  return bancoDados.executar(select);
}

function buscaridServidores(local){
  let select = `SELECT nome_servidor, id_servidor FROM Eyes_On_Server.Servidor WHERE local_servidor = "${local}";`;
  info("searchServers", select);
  return bancoDados.executar(select);
}

// Funções para exportar
function buscarConsumo(fk_servidor, company) {
  var query = `
  SELECT 
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____01%' AND fk_servidor = ${fk_servidor}) as "media_Janeiro",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____02%' AND fk_servidor = ${fk_servidor}) as "media_Fevereiro",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____03%' AND fk_servidor = ${fk_servidor}) as "media_Março",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____04%' AND fk_servidor = ${fk_servidor}) as "media_Abril",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____05%' AND fk_servidor = ${fk_servidor}) as "media_Maio",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____06%' AND fk_servidor = ${fk_servidor}) as "media_Junho",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____07%' AND fk_servidor = ${fk_servidor}) as "media_Julho",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____08%' AND fk_servidor = ${fk_servidor}) as "media_Agosto",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____09%' AND fk_servidor = ${fk_servidor}) as "media_Setembro",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____10%' AND fk_servidor = ${fk_servidor}) as "media_Outubro",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____11%' AND fk_servidor = ${fk_servidor}) as "media_Novembro",
  (SELECT AVG(porcentagem_uso) FROM Eyes_On_Server.Consumo_Servidor WHERE YEAR(momento) = YEAR(NOW()) AND momento LIKE '_____12%' AND fk_servidor = ${fk_servidor}) as "media_Dezembro"
FROM Eyes_On_Server.Consumo_Servidor CS
JOIN Eyes_On_Server.Servidor S ON CS.fk_servidor = S.id_servidor
WHERE S.fk_empresa = ${company}
GROUP BY fk_servidor;
  `;

  info("buscarConsumo()", query);

  return bancoDados.executar(query);
}

function buscarPrevisaoConsumo() {
  var query = `
  SELECT 
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Janeiro')  as 'qtd_feriados_Janeiro',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Fevereiro') as 'qtd_feriados_Fevereiro',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Março') as 'qtd_feriados_Março',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Abril') as 'qtd_feriados_Abril',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Maio') as 'qtd_feriados_Maio',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Junho') as 'qtd_feriados_Junho',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Julho') as 'qtd_feriados_Julho',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Agosto') as 'qtd_feriados_Agosto',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Setembro') as 'qtd_feriados_Setembro',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Outubro') as 'qtd_feriados_Outubro',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Novembro') as 'qtd_feriados_Novembro',
   (SELECT AVG(valor_prioridade) FROM Eyes_On_Server.E_Comerce WHERE mes_feriado LIKE 'Dezembro') as 'qtd_feriados_Dezembro'
  FROM Eyes_On_Server.Consumo_Servidor CS
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

