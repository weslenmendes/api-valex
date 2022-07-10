import { Router } from "express";

import * as cardController from "./../controllers/cardController.js";

import { validateApiKey } from "./../middlewares/apiKeyValidatorMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  employeeExists,
  employeeHasThisCardType,
} from "./../middlewares/employeeValidationMiddleware.js";

import {
  createCardSchemaHeader as createCardSH,
  createCardSchemaBody as createCardSB,
} from "./../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchema(createCardSH, "header"),
  validateSchema(createCardSB, "body"),
  validateApiKey,
  employeeExists,
  employeeHasThisCardType,
  cardController.createCard,
);

export default cardRouter;
