import { faker } from "@faker-js/faker";

import { formatEmployeeName } from "./../../src/utils/formatEmployeeName.js";
import { getNowAddAndFormatDate } from "./../../src/utils/dateUtils.js";

type transactionType =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export function createCard(employeeId: number, typeCard: transactionType) {
  return {
    employeeId,
    number: faker.finance.creditCardNumber().replace(/-/g, ""),
    cardholderName: formatEmployeeName(faker.finance.accountName()),
    securityCode: faker.finance.creditCardCVV(),
    expirationDate: getNowAddAndFormatDate(5, "years", "MM/YY"),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: typeCard,
  };
}
