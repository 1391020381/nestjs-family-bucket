import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      level: "info",
      dirname: "log2",
      filename: "test-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH-mm",
      maxSize: "1k",
    }),
    new winston.transports.Http({
      host: "localhost",
      port: "3003",
      path: "/log",
    }),
  ],
});
logger.info("justdoit");
logger.error("justdoit");
logger.debug(66666);
