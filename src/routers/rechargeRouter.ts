import { Router } from "express";

const rechargeRouter = Router();

import * as rechargeController from "./../controllers/rechargeController.js";

import { validateApiKey } from "./../middlewares/apiKeyValidatorMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  rechargeSchemaParams as rechargeSP,
  rechargeSchemaBody as rechargeSB,
} from "./../schemas/rechargeSchema.js";
import {
  cardExists,
  cardIsActived,
  cardIsExpired,
} from "../middlewares/cardValidationMiddleware.js";
import { companyHasThisEmployee } from "./../middlewares/rechargeValidationMiddleware.js";

rechargeRouter.post(
  "/recharges/:cardId",
  validateApiKey,
  validateSchema(rechargeSP, "params"),
  validateSchema(rechargeSB, "body"),
  cardExists,
  cardIsActived,
  cardIsExpired,
  companyHasThisEmployee,
  rechargeController.recharge,
);

export default rechargeRouter;
