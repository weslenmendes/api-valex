import Joi from "joi";

export const createCardSchemaBody = Joi.object()
  .keys({
    employeeId: Joi.number().required().messages({
      "string.empty": "The 'employeeId' field is required",
      "string.required": "The 'employeeId' field is required",
    }),
    cardType: Joi.string()
      .valid("groceries", "restaurant", "transport", "education", "health")
      .required()
      .messages({
        "string.empty": "The 'cardType' field is required",
        "string.required": "The 'cardType' field is required",
        "any.only":
          "The 'cardType' field must be one of: 'groceries', 'restaurant', 'transport', 'education', 'health'",
      }),
  })
  .required();

export const activateCardSchemaParams = Joi.object({
  cardId: Joi.number().required(),
});

export const activateCardSchemaBody = Joi.object({
  CVC: Joi.number().required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/, "password")
    .required(),
});

export const manageCardSchemaBody = Joi.object({
  password: Joi.string()
    .pattern(/^[0-9]{4}$/, "password")
    .required(),
}).required();
