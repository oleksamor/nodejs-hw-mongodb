import { registerUser } from '../services/auth.js';
import { serializedUser } from '../utils/serializedUser.js';

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

  const user = await loginUser(body);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
  });
};
