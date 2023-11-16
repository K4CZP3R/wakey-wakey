import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Controller } from "./models/controller.interface";
import { AuthController } from "./controllers/auth.controller";
import { getParsedEnvironment } from "./helpers/env.helper";
import { Environment } from "./models/environment.type";
import { errorMiddleware } from "./middlewares/error.middleware";
import { DependencyProviderService } from "./helpers/dependency-injection";
import { PRISMA_INSTANCE, TOKEN_INSTANCE } from "./consts";
import { PrismaClient } from "@prisma/client";
import { CalendarController } from "./controllers/calendar.controller";
import { TokenHelper } from "./helpers/token.helper";

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    const environment = getParsedEnvironment();
    this.bootstrapApp(environment);
  }

  private async bootstrapApp(environment: Environment) {
    this.setupDi(environment);
    this.setupMiddlewares();
    this.setupControllers();
    this.setupAfterMiddlewares();
  }
  private setupDi(enviroment: Environment) {
    DependencyProviderService.setImpl(PRISMA_INSTANCE, new PrismaClient());
    DependencyProviderService.setImpl(
      TOKEN_INSTANCE,
      new TokenHelper(
        enviroment.PASETO_PRIVATE_KEY,
        enviroment.PASETO_PUBLIC_KEY
      )
    );
  }

  private setupMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupControllers() {
    [new AuthController(), new CalendarController()].forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private setupAfterMiddlewares() {
    this.app.use(errorMiddleware);
    this.app.use((req, res, next) => {
      res.status(404).send({ message: "Not found" });
    });
  }
}
