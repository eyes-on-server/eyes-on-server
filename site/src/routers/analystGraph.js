const express = require("express");
const router = express.Router();

const analystController = require("../controller/analystController");

function info(router_name) {
  console.log(`\nRouter --> analystGraph: ${router_name}`);
}

router.get("/selectSectors/:companyName", (req, res) => {
  info("/selectSectors");
  analystController.selectSectors(req, res);
});

router.get("/searchServers/:sectorName", (req, res) => {
  info("/searchServers");
  analystController.searchServers(req, res);
});

router.get("/searchAllAlerts/:companyName", (req, res) => {
  info("/searchAllAlerts");
  analystController.searchAllAlerts(req, res);
});

router.get("/searchCpuAlerts/:companyName", (req, res) => {
  info("/searchCpuAlerts");
  analystController.searchCpuAlerts(req, res);
});

router.get("/searchDiscAlerts/:companyName", (req, res) => {
  info("/searchDiscAlerts");
  analystController.searchDiscAlerts(req, res);
});

router.get("/searchMemoryAlerts/:companyName", (req, res) => {
  info("/searchMemoryAlerts");
  analystController.searchMemoryAlerts(req, res);
});

router.get("/searchLastAlertsByCPU/:companyName", (req, res) => {
  info("/searchLastAlertsByCPU");
  analystController.searchLastAlertsByCPU(req, res);
});

router.get("/searchLastAlertsByMemory/:companyName", (req, res) => {
  info("/searchLastAlertsByMemory");
  analystController.searchLastAlertsByMemory(req, res);
});

router.get("/searchLastAlertsByDisc/:companyName", (req, res) => {
  info("/searchLastAlertsByDisc");
  analystController.searchLastAlertsByDisc(req, res);
});

router.get("/searchServerInformation/:serverName", (req, res) => {
  info("/searchServerInformation");
  analystController.searchServerInformation(req, res);
});

router.get("/searchDatasInLive/:serverName/:componentID", (req, res) => {
  info("/searchDatasInLive");
  analystController.searchDatasInLive(req, res);
});

router.get("/searchAlertsByServer/:serverName", (req, res) => {
  info("/searchAlertsByServer");
  analystController.searchAlertsByServer(req, res);
});

router.get("/searchAlertsByComponent/:serverName/:componentID", (req, res) => {
  info("/searchAlertsByComponent");
  analystController.searchAlertsByComponent(req, res);
});

router.get(
  "/searchLastAlertsByComponents/:serverName/:componentID",
  (req, res) => {
    info("/searchLastAlertsByComponents");
    analystController.searchLastAlertsByComponents(req, res);
  }
);

router.get("/searchDatasForLineGraph/:serverName/:componentID", (req, res) => {
  info("/searchDatasForLineGraph");
  analystController.searchDatasForLineGraph(req, res);
});

router.get("/searchComponents/:serverName", (req, res) => {
  info("/searchComponents");
  analystController.searchComponents(req, res);
});

router.get("/searchDatasByComponent/:serverName/:measureName", (req, res) => {
  info("/searchDatasByComponent");
  analystController.searchDatasByComponent(req, res);
});

module.exports = router;
