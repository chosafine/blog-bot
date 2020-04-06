const { createLogger, format, transports } = require("winston");
const appRoot = "./";

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/blogger.log` }),
  ],
});

module.exports = logger;
