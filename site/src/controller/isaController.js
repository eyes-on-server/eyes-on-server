var isaModel = require('../model/isaModel');

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
    console.log(`\n[isa Controller] ${nome_funcao}`);
}

function buscarNomeServidores(req, res) {
    info("/selectSectors");
  
    let companyName = req.params.companyName;
  
    isaModel
      .buscarNomeServidores(companyName)
      .then((result) => {
        if (result.length > 0) {
          console.log(result);
          res.status(200).json(result);
        } else {
          res.status(204).json(result);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "Error analystController: /buscarNomeServidores\n",
          error.sqlMessage
        );
      });
  }
  

function buscaridServidores(req, res) {
    info("/buscaridServidores");
  
    let serverName = req.params.serverName;
  
    isaModel
      .buscaridServidores(serverName)
      .then((result) => {
        if (result.length > 0) {
          console.log(result);
          res.status(200).json(result);
        } else {
          res.status(204).json(result);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "Error isaController: /buscaridServidores\n",
          error.sqlMessage
        );
      });
  }

// Funções para exportar
function buscarConsumo(req, res,) {
  let fk_servidor = req.params.fk_servidor;
  let company = req.params.company;

  info("/buscarConsumo");
  
  isaModel.buscarConsumo(fk_servidor, company)
  .then(function(resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(500).send("Nenhum servidor encontrado");
      }
  })
  .catch(function(erro) {
      console.error("Erro ao fazer a consulta:", erro);
      res.status(500).json({ error: erro.message || "Erro interno do servidor" });
  });
}

function buscarPrevisaoConsumo(req, res) {
  info("/buscarPrevisaoConsumo");
  isaModel.buscarPrevisaoConsumo()
  .then(function(resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(404).send("Nenhum servidor encontrado");
      }
  })
  .catch(function(erro) {
      console.error("Erro ao fazer a consulta:", erro);
      res.status(500).json({ error: erro.message || "Erro interno do servidor" });
  });
}

module.exports = {
    buscarConsumo,
    buscarPrevisaoConsumo,
    buscarNomeServidores,
    buscaridServidores
}