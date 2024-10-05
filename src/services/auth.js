import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';

const findUserByEmail = async (email) => await User.findOne({ email });

export const registerUser = async (payload) => {
  let user = await findUserByEmail(payload.email);

  if (user) {
    throw createHttpError(409, 'User with this email already registered!');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  let user = await findUserByEmail(payload.email);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
};
