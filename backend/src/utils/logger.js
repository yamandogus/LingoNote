// Winston ile loglama işlemleri burada yapılacak.
import winston from "winston";

const logger = winston.createLogger({
  lavel: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
