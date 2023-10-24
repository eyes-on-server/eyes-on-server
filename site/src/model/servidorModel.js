const bancoDados = require("../database/config");

//Funcões Locais (não exportará) ---------------
function info(nome_funcao, info_query) {
  console.log(`\n[Servidor Model] ${nome_funcao} => ${info_query}`);
}

//Funções para exportar
function listar(fkEmpresa) {


  var query = `
  SELECT
      s.id_servidor AS id,
      s.nome_servidor AS Nome_Servidor,
      s.so_servidor AS Sistema_Operacional,
      s.descricao AS Descricao,
      s.local_servidor AS Local,
      GROUP_CONCAT(c.nome_componente ORDER BY c.id_componente) AS Componentes
  FROM Eyes_On_Server.Servidor AS s
  LEFT JOIN Eyes_On_Server.Componente AS c
  ON FIND_IN_SET(c.id_componente, REPLACE(s.componentes, ' ', ''))
  WHERE s.fk_empresa = ${fkEmpresa}
  GROUP BY s.id_servidor, s.nome_servidor, s.so_servidor, s.descricao, s.local_servidor;
  `;

  info("listar()", query);

  return bancoDados.executar(query);
}

function cadastrar(
  nomeServidor,
  tipoServidor,
  descricaoServidor,
  localServidor
) {
  var query = `INSERT INTO servidor (nomeServidor, tipoServidor, descricaoServidor, localServidor) VALUES ('${nomeServidor}', '${tipoServidor}', '${descricaoServidor}', '${localServidor}')`;

  info("cadastrar()", query);

  return bancoDados.consultaBd(query);
}

function consultar(nomeServidor) {
  var query = `SELECT idServidor, nomeServidor, tipoServidor, descricaoServidor, localServidor FROM servidor WHERE nomeServidor = "${nomeServidor}"`;

  info("consultar()", query);

  return bancoDados.consultaBd(query);
}

function atualizar(
  idServidor,
  nomeServidor,
  tipoServidor,
  descricaoServidor,
  localServidor
) {
  var query = `UPDATE servidor SET nomeServidor = '${nomeServidor}', tipoServidor = '${tipoServidor}', descricaoServidor = '${descricaoServidor}', localServidor = '${localServidor}' WHERE idServidor = ${idServidor}`;

  info("atualizar()", query);

  return bancoDados.consultaBd(query);
}

function deletar(idServidor, nomeServidor) {
  var query = `DELETE FROM servidor WHERE idServidor = ${idServidor} AND nomeServidor = '${nomeServidor}'`;

  info("deletar()", query);

  return bancoDados.consultaBd(query);
}

module.exports = {
  listar,
  cadastrar,
  consultar,
  atualizar,
  deletar,
};
