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
  const cardId = +req.params.cardId || +req.body.cardId;

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
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { card } = res.locals;

  const isRechargeRoute = req.path.includes("recharges");
  const isPurchaseRoute = req.path.includes("purchases");

  if (card.password && !isRechargeRoute && !isPurchaseRoute) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has already been activated.",
    });
  }

  if (!card.password && (isRechargeRoute || isPurchaseRoute)) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has not been activated yet.",
    });
  }

  next();
}

export async function cardIsBlocked(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { card } = res.locals;

  const isUnlockRoute = req.path.includes("unlock");

  if (card.isBlocked && !isUnlockRoute) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has been blocked.",
    });
  }

  if (!card.isBlocked && isUnlockRoute) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card has already been unlocked.",
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
