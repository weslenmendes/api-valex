import { Request, Response, NextFunction } from "express";

import * as employeeRepository from "./../repositories/employeeRepository.js";

import * as errorUtils from "./../utils/errorUtils.js";

export async function companyHasThisEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { company } = res.locals;
  const { card } = res.locals;

  const employee = await employeeRepository.findById(card.employeeId);

  if (+company.id !== +employee.companyId) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "You are not allowed to do this action.",
    });
  }

  next();
}
