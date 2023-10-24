const bancoDados = require("../database/config");

// Funções Locais (Não será exportar)-----------
function info(nome_funcao, info_query) {
  console.log(`\n[User Model] ${nome_funcao} => ${info_query}`);
}

// Funções para exportar
function listar() {
  var query = "SELECT * FROM Usuario";

  info("listar()", query);

  return bancoDados.executar(query);
}

function listarPorFuncionario(idUsuario) {
  var query = `
  SELECT 
  u.id_usuario,
  u.nome,
  u.email,
  l.senha 
  FROM Usuario u 
  join Login l on fk_usuario = id_usuario 
  WHERE u.id_usuario = ${idUsuario}` ;

  info("listar()", query);
  

  return bancoDados.executar(query);
}

function login(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
  SELECT 
    id_usuario,
    u.fk_empresa,
	  u.nome,
    u.email,
    u.cargo,
    e.nome_fantasia,
    l.senha
  FROM Eyes_On_Server.Usuario u 
	  join Eyes_On_Server.Empresa e on u.fk_empresa = e.id_empresa
	  join Eyes_On_Server.Login l on l.fk_usuario = u.id_usuario
    WHERE u.email = "${email}" AND l.senha = "${senha}";  
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return bancoDados.executar(instrucao);
}

function cadastrar(nome, email, senha, cargo, fk_empresa) {

  var query2 = `INSERT INTO Usuario (fk_empresa, nome, cargo, email) VALUES ('${fk_empresa}', '${nome}', '${cargo}','${email}')`;
  bancoDados.executar(query2);

  var query4 = `INSERT INTO Login(fk_usuario, login, senha) VALUES ((SELECT id_usuario FROM Usuario WHERE fk_empresa = ${fk_empresa} ORDER BY id_usuario DESC limit 1), '${email}', ${senha})`
  info("cadastrar()", query4);

  return bancoDados.executar(query4);
}

function consultar(id, nome) {
  var query = `SELECT * FROM usuario WHERE idusuario = "${id}" AND nome = "${nome}"`;

  info("consultar()", query);

  return bancoDados.executar(query);
}

function atualizar(id, nome, senha, email) {
  var query = `UPDATE Usuario SET nome = "${nome}", email = "${senha}" WHERE id_usuario = ${id};`;
  var query2 = `UPDATE Login SET senha = "${email}" WHERE id_login = ${id};`

  info("atualizar()", query);

  return bancoDados.executar(query), bancoDados.executar(query2);
}

function deletar(id, senha, email) {
  var query1 = `DELETE FROM Login WHERE fk_usuario = ${id}`
  bancoDados.executar(query1);
  var query = `DELETE FROM Usuario WHERE id_usuario = ${id}`;

  info("deletar()", query);

  return bancoDados.executar(query);
}

function exibirFuncionario(email, senha){
  var instrucao = `
  SELECT 
    id_usuario,
	  u.nome,
    u.email,
    u.cargo,
    l.senha
  FROM Eyes_On_Server.Usuario u 
	  join Eyes_On_Server.Empresa e on u.fk_empresa = e.id_empresa
	  join Eyes_On_Server.Login l on l.fk_usuario = u.id_usuario
    WHERE u.email = "${email}" AND l.senha = "${senha}";  
    `;
    return bancoDados.executar(instrucao);
  
}

module.exports = {
  listar,
  listarPorFuncionario,
  login,
  cadastrar,
  consultar,
  atualizar,
  deletar,
  exibirFuncionario
};
