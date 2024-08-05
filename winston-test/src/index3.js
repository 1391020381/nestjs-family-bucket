import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      dirname: "log3",
      filename: "test.log",
      format: winston.format.combine(
        winston.format.label({ label: "标签" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.Http({
      host: "localhost",
      port: "3003",
      path: "/log",
    }),
  ],
});
logger.info("justdoit-HTTP");
logger.error("justdoit-HTTP");
logger.debug(66666, "HTTP");
