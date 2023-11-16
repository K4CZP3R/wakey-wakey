import { Router } from "express";
import { Route } from "./route.type";
import { Middleware } from "./middleware.type";

export interface Controller {
  router: Router;
  path: string;

  initialize(routes: Route[], middlewares: Middleware[]): void;
}
