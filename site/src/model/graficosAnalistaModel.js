const bancoDeDados = require("../database/config");

function info(nome_funcao, info_query) {
  console.log(`\n[Graficos analista Model] ${nome_funcao} => ${info_query}`);
}

function buscarInfo(select) {
  info("buscarInfo", select);

  return bancoDeDados.executar(select);
}

module.exports = {
  buscarInfo,
};
