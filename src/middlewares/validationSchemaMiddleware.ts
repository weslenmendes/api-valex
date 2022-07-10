import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import * as errorUtils from "./../utils/errorUtils.js";

type Local = "body" | "query" | "params" | "header";

export function validateSchema(schema: Schema, local: Local) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req[local], { abortEarly: false });

    if (result.error) {
      throw errorUtils.generateError({
        type: "UnprocessableEntityError",
        message: result.error.details
          .map((detail) => detail.message)
          .join(", "),
      });
    }

    res.locals[local] = req[local];

    next();
  };
}
