import { HttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHadler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
      error: err.message,
    });
    return;
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      message: 'MongooseError',
      error: err.message,
    });
  }

  res.status(500).json({
    message: 'Something wrong on our side',
    error: err.message,
  });
};
