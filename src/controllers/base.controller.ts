import { Router } from "express";
import { Controller } from "../models/controller.interface";
import { Middleware } from "../models/middleware.type";
import { Route } from "../models/route.type";
import { wrapMiddlewares, wrapRouteFunction } from "../helpers/wrappers.helper";

export class BaseController implements Controller {
  router: Router = Router();

  constructor(public path: string) {
    this.path = path;
  }

  initialize(routes: Route[], middlewares: Middleware[]): void {
    routes.forEach((route) => {
      if (!route.method || !route.path) {
        console.error(`Invalid route: ${JSON.stringify(route)}`);
        return;
      }

      const mws = wrapMiddlewares([
        ...middlewares,
        ...(route.middlewares || []),
      ]);

      this.router[route.method](route.path, mws, wrapRouteFunction(route.func));
    });
  }
}
