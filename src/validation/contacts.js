import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.number().integer().min(6).max(16).required(),
  email: Joi.string().email().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  parentId: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.number().integer().min(6).max(16),
  email: Joi.string().email().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
