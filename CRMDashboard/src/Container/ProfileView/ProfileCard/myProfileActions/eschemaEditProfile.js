import Joi from 'joi';

const schemaEditAgent = Joi.object({
  firstName: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  lastName: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  position: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  content: Joi.string().allow(''),
  phone: Joi.string().allow(''),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  facebook: Joi.string().allow('').uri({
    scheme: [
      'https',
    ]
  }).messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  instagram: Joi.string().allow('').uri({
    scheme: [
      'https',
    ]
  }).messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  twitter: Joi.string().allow('').uri({
    scheme: [
      'https',
    ]
  }).messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  linkedin: Joi.string().allow('').uri({
    scheme: [
      'https',
    ]
  }).messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  })
});

export default schemaEditAgent
