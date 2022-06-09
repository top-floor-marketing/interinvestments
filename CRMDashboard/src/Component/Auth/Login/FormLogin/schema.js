import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().required().messages({
    // 'string.base': 'Invalid email',
    // 'string.email': 'Invalid email',
    "string.empty": "User name is required",
    "any.required": "User name is required",
  }),
  // .error(errors => {
  //     console.log('errors', errors)
  //     return errors;
  // })
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export default schema;
