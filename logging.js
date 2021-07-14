const mongoose = require("mongoose");
const winston = require("winston");

require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    console.log("We got an exception.");
    winston.error(ex.message, ex);
    process.exit(1);
  }); //synchronize exception

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/first",
      options: { useUnifiedTopology: true },
    })
  );
};
