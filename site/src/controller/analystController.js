var userModel = require("../model/analystGraphModel");

function info(function_name) {
  console.log(`\nController --> analystController: ${function_name}`);
}

function selectSectors(req, res) {
  info("/selectSectors");

  let companyName = req.params.companyName;

  userModel
    .selectSectors(companyName)
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
        "Error analystController: /selectSectors\n",
        error.sqlMessage
      );
    });
}

function searchServers(req, res) {
  info("/searchServers");

  let sectorName = req.params.sectorName;

  userModel
    .searchServers(sectorName)
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
        "Error analystController: /searchServers\n",
        error.sqlMessage
      );
    });
}

function searchAllAlerts(req, res) {
  info("/searchAllAlerts");

  let companyName = req.params.companyName;

  userModel
    .searchAllAlerts(companyName)
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
        "Error analystController: /searchAllAlerts\n",
        error.sqlMessage
      );
    });
}

function searchCpuAlerts(req, res) {
  info("/searchCpuAlerts");

  let companyName = req.params.companyName;

  userModel
    .searchCpuAlerts(companyName)
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
        "Error analystController: /searchCpuAlerts\n",
        error.sqlMessage
      );
    });
}

searchDiscAlerts;

function searchDiscAlerts(req, res) {
  info("/searchDiscAlerts");

  let companyName = req.params.companyName;

  userModel
    .searchDiscAlerts(companyName)
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
        "Error analystController: /searchDiscAlerts\n",
        error.sqlMessage
      );
    });
}

function searchMemoryAlerts(req, res) {
  info("/searchMemoryAlerts");

  let companyName = req.params.companyName;

  userModel
    .searchMemoryAlerts(companyName)
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
        "Error analystController: /searchMemoryAlerts\n",
        error.sqlMessage
      );
    });
}

function searchLastAlertsByCPU(req, res) {
  info("/searchLastAlertsByCPU");

  let companyName = req.params.companyName;

  userModel
    .searchLastAlertsByCPU(companyName)
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
        "Error analystController: /searchLastAlertsByCPU\n",
        error.sqlMessage
      );
    });
}

function searchLastAlertsByMemory(req, res) {
  info("/searchLastAlertsByMemory");

  let companyName = req.params.companyName;

  userModel
    .searchLastAlertsByMemory(companyName)
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
        "Error analystController: /searchLastAlertsByMemory\n",
        error.sqlMessage
      );
    });
}

function searchLastAlertsByDisc(req, res) {
  info("/searchLastAlertsByDisc");

  let companyName = req.params.companyName;

  userModel
    .searchLastAlertsByDisc(companyName)
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
        "Error analystController: /searchLastAlertsByDisc\n",
        error.sqlMessage
      );
    });
}

function searchServerInformation(req, res) {
  info("/searchServerInformation");

  let serverName = req.params.serverName;

  userModel
    .searchServerInformation(serverName)
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
        "Error analystController: /searchServerInformation\n",
        error.sqlMessage
      );
    });
}

function searchDatasInLive(req, res) {
  info("/searchDatasInLive");

  let serverName = req.params.serverName;
  let componentID = req.params.componentID;

  userModel
    .searchDatasInLive(serverName, componentID)
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
        "Error analystController: /searchDatasInLive\n",
        error.sqlMessage
      );
    });
}

function searchAlertsByServer(req, res) {
  info("/searchAlertsByServer");

  let serverName = req.params.serverName;

  userModel
    .searchAlertsByServer(serverName)
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
        "Error analystController: /searchAlertsByServer\n",
        error.sqlMessage
      );
    });
}

function searchAlertsByComponent(req, res) {
  info("/searchAlertsByComponent");

  let serverName = req.params.serverName;
  let componentID = req.params.componentID;

  userModel
    .searchAlertsByComponent(serverName, componentID)
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
        "Error analystController: /searchAlertsByComponent\n",
        error.sqlMessage
      );
    });
}

function searchLastAlertsByComponents(req, res) {
  info("/searchLastAlertsByComponents");

  let serverName = req.params.serverName;
  let componentID = req.params.componentID;

  userModel
    .searchLastAlertsByComponents(serverName, componentID)
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
        "Error analystController: /searchLastAlertsByComponents\n",
        error.sqlMessage
      );
    });
}

function searchDatasForLineGraph(req, res) {
  info("/searchDatasForLineGraph");

  let serverName = req.params.serverName;
  let componentID = req.params.componentID;

  userModel
    .searchDatasForLineGraph(serverName, componentID)
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
        "Error analystController: /searchDatasForLineGraph\n",
        error.sqlMessage
      );
    });
}

function searchComponents(req, res) {
  info("/searchComponents");

  let serverName = req.params.serverName;

  userModel
    .searchComponents(serverName)
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
        "Error analystController: /searchComponents\n",
        error.sqlMessage
      );
    });
}

function searchDatasByComponent(req, res) {
  info("/searchDatasByComponent");

  let serverName = req.params.serverName;
  let measureName = req.params.measureName;

  userModel
    .searchDatasByComponent(serverName, measureName)
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
        "Error analystController: /searchDatasByComponent\n",
        error.sqlMessage
      );
    });
}

module.exports = {
  selectSectors,
  searchServers,
  searchAllAlerts,
  searchCpuAlerts,
  searchDiscAlerts,
  searchMemoryAlerts,
  searchLastAlertsByCPU,
  searchLastAlertsByMemory,
  searchLastAlertsByDisc,
  searchServerInformation,
  searchDatasInLive,
  searchAlertsByServer,
  searchAlertsByComponent,
  searchLastAlertsByComponents,
  searchDatasForLineGraph,
  searchComponents,
  searchDatasByComponent,
};
