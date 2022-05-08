const fs = require("fs");
const path = require("path");
const pool = require("./connections");

const logFile = path.join(__dirname, "./log.txt");

const recordLog = (type, info) => {
  fs.appendFileSync(logFile, `>> ${type} :: ${info} \n`);
};

pool.on("connection", function (connection) {
  recordLog("CON", connection.threadId);
});

pool.on("enqueue", function () {
  recordLog("ENQ", "");
});

pool.on("acquire", function (connection) {
  recordLog("ACQ", connection.threadId);
});

pool.on("release", function (connection) {
  recordLog("REL", connection.threadId);
});
