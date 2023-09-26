const bancoDados = require("../database/config");

// Funções Locais (Não será exportar)-----------
function info(nome_funcao, info_query) {
  console.log(`\n[User Model] ${nome_funcao} => ${info_query}`);
}

// Funções para exportar
function listar() {
  var query = "SELECT * FROM usuario";

  info("listar()", query);

  return bancoDados.executar(query);
}

function cadastrar(nome, email, senha) {
  var query = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

  info("cadastrar()", query);

  return bancoDados.executar(query);
}

function consultar(id, nome) {
  var query = `SELECT * FROM usuario WHERE idusuario = "${id}" AND nome = "${nome}"`;

  info("consultar()", query);

  return bancoDados.executar(query);
}

function atualizar(id, nome, senha, email) {
  var query = `UPDATE usuario SET nome = "${nome}", senha = "${senha}", email = "${email}" WHERE idusuario = ${id};`;

  info("atualizar()", query);

  return bancoDados.executar(query);
}

function deletar(senha, email) {
  var query = `DELETE FROM usuario WHERE senha = "${senha}" and email = "${email}"`;

  info("deletar()", query);

  return bancoDados.executar(query);
}

module.exports = {
  listar,
  cadastrar,
  consultar,
  atualizar,
  deletar,
};
