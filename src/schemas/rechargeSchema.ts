import Joi from "joi";

export const rechargeSchemaParams = Joi.object({
  cardId: Joi.number().required(),
});

export const rechargeSchemaBody = Joi.object({
  amount: Joi.number().greater(0).required(),
});
