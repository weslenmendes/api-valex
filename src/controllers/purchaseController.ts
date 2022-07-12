import { Request, Response } from "express";

import * as purchaseService from "./../services/purchaseService.js";

export async function purchase(req: Request, res: Response) {
  const { card } = res.locals;
  const { businessId, amount, password } = req.body;

  await purchaseService.purchaseItem(card, businessId, amount, password);

  res.status(201).send({ message: "Purchase successful." });
}

export async function onlinePurchase(req: Request, res: Response) {
  const { card } = res.locals;
  const { businessId, amount } = req.body;

  await purchaseService.purchaseItemOnline(card, +businessId, +amount);

  res.status(201).send({ message: "Purchase successful." });
}
