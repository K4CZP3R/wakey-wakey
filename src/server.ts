import http from "http";
import { App } from "./app";
import { getParsedEnvironment } from "./helpers/env.helper";

const env = getParsedEnvironment();

const app = new App();
const server = http.createServer(app.app);

server.listen(env.SERVER_PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${env.SERVER_PORT}!`);
});
