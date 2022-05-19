import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'Invalid email',
            // 'string.email': 'Invalid email',
            'string.empty': 'email is required',
            'any.required': 'email is required'
        })
    // .error(errors => {
    //     console.log('errors', errors)
    //     return errors;
    // })
    ,
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'password is required',
            'any.required': 'password is required'
        })
    ,
});

export default schema