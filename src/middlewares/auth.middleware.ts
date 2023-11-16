import { NextFunction, Request, Response } from "express";
import { DependencyProviderService } from "../helpers/dependency-injection";
import { TokenHelper } from "../helpers/token.helper";
import { TOKEN_INSTANCE } from "../consts";

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    response.status(401).json({
      message: "No authorization header",
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    response.status(401).json({
      message: "No token in authorization header",
    });
    return;
  }

  try {
    const data =
      DependencyProviderService.getImpl<TokenHelper>(
        TOKEN_INSTANCE
      ).verifyToken(token);

    // @ts-ignore
    request.session = data.payload;

    next();
  } catch (error) {
    response.status(401).json({
      message: "Invalid token",
    });
    return;
  }
}
