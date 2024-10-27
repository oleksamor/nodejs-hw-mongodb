import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY, SMTP } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';
import { sendEmail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';
import jwt from 'jsonwebtoken';
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + FIFTEEN_MINUTES,
  refreshTokenValidUntil: Date.now() + ONE_DAY,
});

const findUserByEmail = async (email) => await User.findOne({ email });

export const registerUser = async (payload) => {
  const user = await findUserByEmail(payload.email);

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

export const logoutUser = async (sessionId, refreshToken) => {
  await SessionsCollection.deleteOne({
    _id: sessionId,
    refreshToken: refreshToken,
  });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await SessionsCollection.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  const newSession = await SessionsCollection.create({
    userId: session.userId,
    ...createSession(),
  });
  return newSession;
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: 60 * 5,
    },
  );

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });

  //доповнимо
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.findByIdAndUpdate(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await User.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
      role: 'parent',
    });
  }

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};
