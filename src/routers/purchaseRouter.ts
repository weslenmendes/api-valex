import { Router } from "express";

const purchaseRouter = Router();

import * as purchaseController from "./../controllers/purchaseController.js";

import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import { purchaseSchemaBody } from "./../schemas/purchaseSchema.js";
import {
  cardExists,
  cardIsActived,
  cardIsExpired,
  cardIsBlocked,
} from "./../middlewares/cardValidationMiddleware.js";

purchaseRouter.post(
  "/purchases",
  validateSchema(purchaseSchemaBody, "body"),
  cardExists,
  cardIsActived,
  cardIsExpired,
  cardIsBlocked,
  purchaseController.purchase,
);

export default purchaseRouter;
