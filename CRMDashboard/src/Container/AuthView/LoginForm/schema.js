import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "User name is required",
    "any.required": "User name is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export default schema;
