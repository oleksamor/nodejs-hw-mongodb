import { loginUser, registerUser } from '../services/auth.js';
import { serializedUser } from '../utils/serializedUser.js';
import { ONE_DAY } from '../constants/index.js';

export const registerController = async (req, res) => {
  const { body } = req;

  const user = await registerUser(body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: serializedUser(user),
  });
};

export const loginUserController = async (req, res) => {
  const { body } = req;

  const session = await loginUser(body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
