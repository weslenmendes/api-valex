import Joi from "joi";

export const purchaseSchemaBody = Joi.object({
  cardId: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().integer().positive().greater(0).required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/, "password")
    .required(),
});

export const onlinePurchaseSchemaBody = Joi.object({
  number: Joi.string().required(),
  holderName: Joi.string().required(),
  expirationDate: Joi.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
    .required()
    .messages({
      "string.pattern.base": "Expiration date must be in the format MM/YY",
    }),
  CVC: Joi.string().length(3).required(),
  businessId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().greater(0).required(),
});
