import Joi from "joi";

const shemaLeadForm = Joi.object({
    nameLeads: Joi.string().required().messages({
        // 'string.base': 'Invalid email',
        // 'string.email': 'Invalid email',
        "string.empty": "Name leads is required",
        "any.required": "Name leads is required",
    }),
    // .error(errors => {
    //     console.log('errors', errors)
    //     return errors;
    // })
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
            "any.required": "Please fill in the following field Email",
            "string.empty": "empty",
            "string.email": "Email must be a valid email"
        }),
    phoneNumber: Joi.number()
        .required(),
    note: Joi.string()
        .required()
        .min(12)
        .messages({
            "any.required": "Please fill in the following field Message Contact",
            "string.empty": "empty",
            "string.min": "Message Contact length must be at least 12 characters long"
        })
    // otherNameLeads: Joi.string(),
    // otherEmail: Joi.string(),
    // otherPhoneNumber: Joi.number()
});

export default shemaLeadForm;