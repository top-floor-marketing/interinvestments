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
        .required()
        .min(4)
        .max(300)
        .messages({
            "any.required": "Please fill in the following field Message Contact",
            "string.empty": "empty",
            "string.min": "Message Contact length must be at least 4 characters long",
            "string.max": ""
        }),
});

export default schema;

// const schema = Joi.object({
//     username: Joi.string().required().messages({
//       // 'string.base': 'Invalid email',
//       // 'string.email': 'Invalid email',
//       "string.empty": "User name is required",
//       "any.required": "User name is required",
//     }),
//     // .error(errors => {
//     //     console.log('errors', errors)
//     //     return errors;
//     // })
//     password: Joi.string().required().messages({
//       "string.empty": "Password is required",
//       "any.required": "Password is required",
//     }),
//   });

//   export default schema;
