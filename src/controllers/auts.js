import { registerUser } from '../services/auth';

export const registerController = async (req, res) => {
  registerUser();
};
