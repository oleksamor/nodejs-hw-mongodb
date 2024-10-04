import { registerUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  const { body } = req;

  const user = await registerUser(body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: { user },
  });
};
