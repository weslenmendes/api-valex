import { Router } from "express";

import * as cardController from "./../controllers/cardController.js";

import { validateApiKey } from "./../middlewares/apiKeyValidatorMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  employeeExists,
  employeeHasThisCardType,
} from "./../middlewares/employeeValidationMiddleware.js";
import {
  cardExists,
  cardIsActived,
  cardIsCVCValid,
  cardIsExpired,
} from "./../middlewares/cardValidationMiddleware.js";

import {
  createCardSchemaBody as createCardSB,
  activateCardSchemaParams as activateCardSP,
  activateCardSchemaBody as activateCardSB,
} from "./../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateApiKey,
  validateSchema(createCardSB, "body"),
  employeeExists,
  employeeHasThisCardType,
  cardController.createCard,
);

cardRouter.put(
  "/cards/activate/:cardId",
  validateSchema(activateCardSP, "params"),
  validateSchema(activateCardSB, "body"),
  cardExists,
  cardIsExpired,
  cardIsActived,
  cardIsCVCValid,
  cardController.activateCard,
);

export default cardRouter;
