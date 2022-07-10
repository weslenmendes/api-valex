import Joi from "joi";

export const createCardSchemaHeader = Joi.object({
  "x-api-key": Joi.string().required(),
});

export const createCardSchemaBody = Joi.object({
  employeeId: Joi.string().required(),
  cardType: Joi.string()
    .valid("groceries", "restaurants", "transport", "education", "health")
    .required(),
});
