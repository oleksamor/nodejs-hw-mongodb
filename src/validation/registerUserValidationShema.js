import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required().email(),
  password: Joi.string().min(6).max(20).required(),
});
