import { Request, Response } from "express";

import * as cardService from "./../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const { cardType } = req.body;
  const { employee } = res.locals;

  const result = await cardService.createCard({ employee, cardType });

  res.status(201).send({ ...result });
}

export async function activateCard(req: Request, res: Response) {
  const { cardId } = req.params;
  const { password } = req.body;

  await cardService.activateCard(+cardId, password);

  res.sendStatus(200);
}

export async function getCardBalanceAndTransactions(
  req: Request,
  res: Response,
) {
  const { cardId } = req.params;

  const result = await cardService.getBalanceAndTransactions(+cardId);

  res.send(result);
}

export async function manageCard(req: Request, res: Response) {
  const { cardId } = req.params;
  const { password } = req.body;

  if (req.path.includes("block"))
    await cardService.manageCard(+cardId, password, true);
  else if (req.path.includes("unblock"))
    await cardService.manageCard(+cardId, password, false);

  res.sendStatus(200);
}
