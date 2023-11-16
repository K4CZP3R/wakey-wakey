import { NextFunction, Request, Response } from "express";
import { Middleware } from "../models/middleware.type";
import { RouteFunction } from "../models/route-function.type";

export function wrapMiddleware(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = middleware(req, res, next);
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapMiddlewares(middleware: Middleware[]) {
  return middleware.map((m) => wrapMiddleware(m));
}

export function wrapRouteFunction(routeFunction: RouteFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = JSON.parse(JSON.stringify(req.query));
      const body = req.body;
      const params = req.params;
      // @ts-ignore
      const session = req.session;
      const response = await routeFunction({ query, body, params, session });

      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  };
}
