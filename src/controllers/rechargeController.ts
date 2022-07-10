import { Request, Response } from "express";

import * as rechargeService from "./../services/rechargeService.js";

export async function recharge(req: Request, res: Response) {
  const { cardId } = req.params;
  const { amount } = req.body;

  await rechargeService.rechargeCard(+cardId, amount);

  res.sendStatus(201);
}
