import { Request, Response, NextFunction } from "express";

import * as companyRepository from "./../repositories/companyRepository.js";
import * as errorUtils from "./../utils/errorUtils.js";

export async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const xApiKey = req.header("x-api-key");

  if (!xApiKey) {
    throw errorUtils.generateError({
      type: "BadRequestError",
      message: "x-api-key header is required",
    });
  }

  const company = await companyRepository.findByApiKey(xApiKey);

  if (!company) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "Invalid API Key",
    });
  }

  res.locals.company = company;

  next();
}
