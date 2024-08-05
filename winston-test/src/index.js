import winstom from "winston";

const logger = winstom.createLogger({
  level: "debug",
  format: winstom.format.simple(),
  transports: [
    new winstom.transports.Console(),
    new winstom.transports.File({
      dirname: "log",
      filename: "test.log",
      maxsize: 1024,
    }),
  ],
});
logger.info("justdoit");
logger.error("justdoit");
logger.debug(666666);
