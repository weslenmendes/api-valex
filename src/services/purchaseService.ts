import * as cardRepository from "./../repositories/cardRepository.js";
import * as paymentRepository from "./../repositories/paymentRepository.js";
import * as businessRepository from "./../repositories/businessRepository.js";
import * as cardService from "./../services/cardService.js";
import * as errorUtils from "./../utils/errorUtils.js";
import * as encryptUtils from "./../utils/encryptUtils.js";

export async function purchaseItem(
  card: cardRepository.Card,
  businessId: number,
  amount: number,
  password: string,
) {
  const cardData = await cardRepository.findById(card.id);

  if (!encryptUtils.decryptPassword(password, cardData.password)) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This password is incorrect.",
    });
  }

  const business = await businessRepository.findById(businessId);

  if (!business) {
    throw errorUtils.generateError({
      type: "NotFoundError",
      message: "This business does not exist.",
    });
  }

  if (cardData.type !== business.type) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card is not valid for this business.",
    });
  }

  const { balance } = await cardService.getBalanceAndTransactions(card.id);

  if (+balance < +amount) {
    throw errorUtils.generateError({
      type: "UnauthorizedError",
      message: "This card does not have enough balance.",
    });
  }

  await paymentRepository.insert({ cardId: card.id, businessId, amount });
}
