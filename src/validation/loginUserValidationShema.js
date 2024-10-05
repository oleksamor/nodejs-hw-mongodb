import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required().email(),
  password: Joi.string().min(6).max(20).required(),
});
