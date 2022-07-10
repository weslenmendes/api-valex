import { Request, Response, NextFunction } from "express";
import { errorDetailsGenerator } from "./../utils/errorUtils.js";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { statusCode, message } = errorDetailsGenerator(err);

  if (message) {
    return res.status(statusCode).send({ message });
  }

  res.sendStatus(statusCode);
}
