import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';

export const registerUser = async (payload) => {
  let user = await User.find({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'User with this email already registered!');
  }
  user = await User.create(payload);

  return user;
};
