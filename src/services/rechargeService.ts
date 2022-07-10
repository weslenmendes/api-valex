import * as rechargeRepository from "./../repositories/rechargeRepository.js";

export async function rechargeCard(cardId: number, amount: number) {
  await rechargeRepository.insert({ cardId, amount });
}
