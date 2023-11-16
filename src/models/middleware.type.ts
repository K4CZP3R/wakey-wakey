import { Request, Response, NextFunction } from "express";

type SyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response;

type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export type Middleware = SyncMiddleware | AsyncMiddleware;
