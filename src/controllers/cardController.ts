import { Request, Response } from "express";

import * as cardService from "./../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const { cardType } = req.body;
  const { employee } = res.locals;

  await cardService.createCard({ employee, cardType });

  res.sendStatus(201);
}
