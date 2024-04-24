import express from "express";
import routes from "./routes";
import helmet from "helmet";
import log from "./utils/logger";
import { appointments, doctors } from "./data";

const app = express();
const port = 4200;

app.use(express.json());
app.use(helmet());

routes(app);

app.listen(port, () => {
  log.info(`Server is listening on port http://localhost:${port}`);
  log.info({ doctors, appointments });
});
