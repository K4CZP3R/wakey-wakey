import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (response.headersSent) {
    console.warn("Headers already sent, cannot send error response");
    return;
  }
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      response.status(400).json({
        message: "Cannot create duplicate resource",
        code: error.code,
      });
    }
  } else if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation error",
      errors: error.issues,
    });
  } else if (error instanceof Error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    response.status(500).json({
      message: error,
    });
  }
}
