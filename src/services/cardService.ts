import { faker } from "@faker-js/faker";

import * as cardRepository from "./../repositories/cardRepository.js";

import { formatEmployeeName } from "./../utils/formatEmployeeName.js";
import { encryptSecurityCode } from "./../utils/encryptUtils.js";
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
  cardData.number = faker.finance.creditCardNumber();
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