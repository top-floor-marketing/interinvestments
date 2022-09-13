import Joi from "joi";

const schema = Joi.object({
    fullName: Joi.string()
        .required()
        .messages({
            "string.empty": "empty",
        }),
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
            "any.required": "Please fill in the following field Email",
            "string.empty": "empty",
            "string.email": "Email must be a valid email"
        }),
    messageContact: Joi.string()
        .max(300).allow('')
        .messages({
            "string.max": "Max comment length 300"
        }),
        phone: Joi.string().allow('').max(30).messages({
            "string.max": "Max phone length 30"
        }),
});

export default schema;