import { Request, Response, NextFunction } from "express";

import * as employeeRepository from "./../repositories/employeeRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";

import * as errorUtils from "./../utils/errorUtils.js";

export async function employeeExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const employee = await employeeRepository.findById(req.body.employeeId);

  if (!employee) {
    throw errorUtils.generateError({
      type: "NotFoundError",
      message: "Employee not found",
    });
  }

  res.locals.employee = employee;

  next();
}

export async function employeeHasThisCardType(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { employeeId, cardType } = req.body;

  const card = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId,
  );

  if (card) {
    throw errorUtils.generateError({
      type: "UnprocessableEntityError",
      message: "Employee has this card type, choose another type",
    });
  }

  next();
}
