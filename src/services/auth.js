import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';

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
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  const session = await createActiveSession(user._id);
  return session;
};

const createActiveSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = Date.now() + FIFTEEN_MINUTES;
  const refreshTokenValidUntil = Date.now() + ONE_DAY;

  return SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const logoutUser = async (sessionId, sessionToken) => {
  await SessionsCollection.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};
