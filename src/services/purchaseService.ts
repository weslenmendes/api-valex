import * as cardRepository from "./../repositories/cardRepository.js";
import * as paymentRepository from "./../repositories/paymentRepository.js";
import * as businessRepository from "./../repositories/businessRepository.js";
import * as cardService from "./../services/cardService.js";
import * as errorUtils from "./../utils/errorUtils.js";
import * as encryptUtils from "./../utils/encryptUtils.js";

async function businessExists(
  businessId: number,
): Promise<businessRepository.Business> {
  if (!businessId) {
    throw errorUtils.generateError({
      type: "UnprocessableEntityError",
      message: "The businessId is required.",
    });
  }

  const business = await businessRepository.findById(businessId);

  if (!business) {
    throw errorUtils.generateError({
      type: "NotFoundError",
      message: "This business does not exist.",
    });
  }

  return business;
}

async function areSameType(
  card: cardRepository.Card,
  business: businessRepository.Business,
) {
  if (card.type !== business.type) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card is not valid for this business.",
    });
  }
}

async function cardHasBalance(card: cardRepository.Card, amount: number) {
  const { balance } = await cardService.getBalanceAndTransactions(card.id);

  if (+balance < +amount) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card does not have enough balance.",
    });
  }
}

export async function purchaseItem(
  card: cardRepository.Card,
  businessId: number,
  amount: number,
  password: string,
) {
  if (!encryptUtils.decryptPassword(password, card.password)) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This password is incorrect.",
    });
  }

  const business = await businessExists(businessId);

  await areSameType(card, business);

  await cardHasBalance(card, amount);

  await paymentRepository.insert({ cardId: card.id, businessId, amount });
}

export async function purchaseItemOnline(
  card: cardRepository.Card,
  businessId: number,
  amount: number,
) {
  const business = await businessExists(businessId);

  await areSameType(card, business);

  await cardHasBalance(card, amount);

  await paymentRepository.insert({ cardId: card.id, businessId, amount });
}
