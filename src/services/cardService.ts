import { faker } from "@faker-js/faker";

import * as cardRepository from "./../repositories/cardRepository.js";
import * as rechargeRepository from "./../repositories/rechargeRepository.js";
import * as paymentRepository from "./../repositories/paymentRepository.js";

import { formatEmployeeName } from "./../utils/formatEmployeeName.js";
import {
  encryptSecurityCode,
  encryptPassword,
  decryptPassword,
} from "./../utils/encryptUtils.js";
import { getNowAddAndFormatDate } from "./../utils/dateUtils.js";
import { generateError } from "./../utils/errorUtils.js";

type Employee = {
  id: number;
  fullName: string;
};

type CreateCard = {
  employee: Employee;
  cardType: cardRepository.TransactionTypes;
};

export async function createCard({ employee, cardType }: CreateCard) {
  const cardData = generateCardData(employee.id, employee.fullName, cardType);

  const card: any = await cardRepository.insert(cardData);

  if (card.rowCount === 0) {
    throw generateError({
      type: "BadRequestError",
      message: "An error occurred while creating the card.",
    });
  }

  return card.rows[0];
}

function generateCardData(
  employeeId: number,
  employeeFullName: string,
  cardType: cardRepository.TransactionTypes,
  password: string = null,
  isVirtual: boolean = false,
  originalCardId: number = null,
): cardRepository.CardInsertData {
  const cardData: any = {};

  cardData.employeeId = employeeId;
  cardData.number = faker.finance.creditCardNumber().replace(/-/g, "");
  cardData.cardholderName = formatEmployeeName(employeeFullName);
  cardData.securityCode = encryptSecurityCode(faker.finance.creditCardCVV());
  cardData.expirationDate = getNowAddAndFormatDate(5, "years", "MM/YY");
  cardData.password = password;
  cardData.isVirtual = isVirtual;
  cardData.originalCardId = originalCardId;
  cardData.isBlocked = false;
  cardData.type = cardType;

  return cardData;
}

export async function activateCard(cardId: number, password: string) {
  const cardData = await cardRepository.findById(cardId);

  if (!cardData) {
    throw generateError({
      type: "NotFoundError",
      message: "The card does not exist.",
    });
  }

  cardData.password = encryptPassword(password);

  await cardRepository.update(cardId, cardData);
}

export async function getBalanceAndTransactions(cardId: number) {
  const recharges = await rechargeRepository.findByCardId(cardId);
  const transactions = await paymentRepository.findByCardId(cardId);

  const sum = (acc: number, curr: any): number => acc + curr.amount;

  const rechargesSum = recharges.reduce(sum, 0);
  const transactionsSum = transactions.reduce(sum, 0);
  const balance = rechargesSum - transactionsSum;

  return {
    balance,
    transactions,
    recharges,
  };
}

export async function manageCard(
  cardId: number,
  password: string,
  isBlocked: boolean,
) {
  const cardData = await cardRepository.findById(cardId);

  const isEquals = decryptPassword(password, cardData.password);

  if (!isEquals) {
    throw generateError({
      type: "UnauthorizedError",
      message: "The password is incorrect.",
    });
  }

  cardData.isBlocked = isBlocked;

  await cardRepository.update(cardId, cardData);
}
