import { Middleware } from "./middleware.type";
import { RouteFunction } from "./route-function.type";

export type Route = {
  path: string;
  method: "get" | "post" | "put" | "delete";
  func: RouteFunction;
  middlewares?: Middleware[];
};
