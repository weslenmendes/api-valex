import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

import * as cardRepository from "./../repositories/cardRepository.js";

import * as errorUtils from "./../utils/errorUtils.js";
import * as dateUtils from "./../utils/dateUtils.js";
import * as encryptUtils from "./../utils/encryptUtils.js";

export async function cardExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cardId = +req.params.cardId;

  const card = await cardRepository.findById(cardId);

  if (!card) {
    throw errorUtils.generateError({
      type: "NotFoundError",
      message: "The card does not exist.",
    });
  }

  res.locals.card = card;

  next();
}

export async function cardIsExpired(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { card } = res.locals;

  if (dateUtils.isExpired(card.expirationDate)) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "The card is expired.",
    });
  }

  next();
}

export async function cardIsActived(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { card } = res.locals;

  if (card.password) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has already been activated.",
    });
  }

  next();
}

export async function cardIsBlocked(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { card } = res.locals;

  if (card.isBlocked) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has been blocked.",
    });
  }

  next();
}

export async function cardIsCVCValid(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { CVC } = req.body;
  const { card } = res.locals;

  const securityCodeDecrypted = encryptUtils.decryptSecurityCode(
    card.securityCode,
  );

  if (+securityCodeDecrypted !== +CVC) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "The CVC is invalid.",
    });
  }

  next();
}
