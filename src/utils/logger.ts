import logger from "pino";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
    },
  },
  base: {
    pid: false,
  },
});
export default log;
