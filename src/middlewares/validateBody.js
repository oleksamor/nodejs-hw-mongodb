import createHttpError from 'http-errors';

export const validateBody = (contactsSchema) => async (req, res, next) => {
  try {
    await contactsSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
