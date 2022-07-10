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
  cardIsBlocked,
  cardIsCVCValid,
  cardIsExpired,
} from "./../middlewares/cardValidationMiddleware.js";

import {
  createCardSchemaBody as createCardSB,
  activateCardSchemaParams as activateCardSP,
  activateCardSchemaBody as activateCardSB,
  manageCardSchemaBody as manageCardSB,
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

cardRouter.put(
  "/cards/block/:cardId",
  validateSchema(activateCardSP, "params"),
  validateSchema(manageCardSB, "body"),
  cardExists,
  cardIsExpired,
  cardIsBlocked,
  cardController.manageCard,
);

cardRouter.get(
  "/cards/statements/:cardId",
  validateSchema(activateCardSP, "params"),
  cardExists,
  cardController.getCardBalanceAndTransactions,
);

export default cardRouter;
