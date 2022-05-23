import Joi from 'joi';

const schema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            // 'string.base': 'Invalid email',
            // 'string.email': 'Invalid email',
            'string.empty': 'user name is required',
            'any.required': 'user name is required'
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