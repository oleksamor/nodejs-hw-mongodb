import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerController } from '../controllers/auts';
import { validateBody } from '../middlewares/validateBody';
import { registerUserValidationSchema } from '../validation/registerUserValidationShema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerController),
);
authRouter.post('/login');
authRouter.post('/logout');
authRouter.post('/refresh-session');

export default authRouter;
