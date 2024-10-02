import { User } from '../db/models/user';

export const registerUser = async (payload) => {
  const user = await User.create(payload);

  return user;
};
