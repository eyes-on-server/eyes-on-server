var OtavioModel = require('../model/otavioModel');

function grafico(req, res) {
    // info("grafico()")
    var fkEmpresa = req.body.fkEmpresa_html;
    console.log(req.body.fkEmpresa_html)

    if(fkEmpresa == undefined){
        res.status(400).send("O nome do Servidor está indefinido")
    } else

    OtavioModel.grafico(fkEmpresa).then((resultado) => {
        if (resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("TÁ VAZIO AQUI TIO, CADE AS INFO???!");
        }
    }).catch((erro) =>{
        console.log(erro);
        console.log("!!ERRO > ServidorController: Listar()\n",erro.sqlMessage)
    })
}


function buscarInfo(req, res) {
    // info("/buscarInfo");
  
    var select = req.body.selectServer;
    console.log(req.body);
  
    if (select == undefined) {
      res.status(400).send("O nome fantasia da empresa está indefinido!");
    }else console.log(`passou da controller`)
  
    OtavioModel
      .buscarInfo(select)
      .then((resultado) => {
        if (resultado.length > 0) {
          console.log(resultado);
          res.status(200).json(resultado);
        } else {
          res.status(204).json(resultado);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "Erro na Controller: /otavio\n",
          error.sqlMessage
        );
      });
  }

  function setDados(req, res) {
    // info("/buscarInfo");
  
    var select = req.body.selectServer;
    console.log(req.body);
  
    if (select == undefined) {
      res.status(400).send("O nome servidor está indefinido!");
    }else console.log(`passou da controller`)
  
    OtavioModel
      .buscarInfo(select)
      .then((resultado) => {
        if (resultado.length > 0) {
          console.log(resultado);
          res.status(200).json(resultado);
        } else {
          res.status(204).json(resultado);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "Erro na Controller: /processos\n",
          error.sqlMessage
        );
      });
  }




module.exports = {
    grafico,
    buscarInfo,
    setDados
};



// // otavioController.js
// const otavioModel = require('../model/otavioModel');

// function dadosTempoReal(req, res) {

//     var fkEmpresa = req.body.fkEmpresa_html;
//     console.log(req.body.fkEmpresa_html)

//     if (fkEmpresa == undefined) {
//         res.status(400).send("O nome do Servidor está indefinido")
//     } else

//         servidorModel.listar(fkEmpresa).then((resultado) => {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             }
//             else {
//                 res.status(204).send("TÁ VAZIO AQUI TIO, CADE AS INFO???!");
//             }
//         }).catch((erro) => {
//             console.log(erro);
//             console.log("!!ERRO > ServidorController: Listar()\n", erro.sqlMessage)
//         })
// }
    
    


// module.exports = { dadosTempoReal };

