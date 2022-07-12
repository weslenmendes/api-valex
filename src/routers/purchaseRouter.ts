import { Router } from "express";

const purchaseRouter = Router();

import * as purchaseController from "./../controllers/purchaseController.js";

import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  purchaseSchemaBody as purchaseSB,
  onlinePurchaseSchemaBody as onlinePurchaseSB,
} from "./../schemas/purchaseSchema.js";
import {
  cardExists,
  cardIsActived,
  cardIsExpired,
  cardIsBlocked,
  cardIsCVCValid,
} from "./../middlewares/cardValidationMiddleware.js";

purchaseRouter.post(
  "/purchases",
  validateSchema(purchaseSB, "body"),
  cardExists,
  cardIsActived,
  cardIsExpired,
  cardIsBlocked,
  purchaseController.purchase,
);

purchaseRouter.post(
  "/purchases/online",
  validateSchema(onlinePurchaseSB, "body"),
  cardExists,
  cardIsExpired,
  cardIsBlocked,
  cardIsCVCValid,
  purchaseController.onlinePurchase,
);

export default purchaseRouter;
