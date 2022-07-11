import Joi from "joi";

export const purchaseSchemaBody = Joi.object({
  cardId: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().integer().greater(0).required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/, "password")
    .required(),
});
