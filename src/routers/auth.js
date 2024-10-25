import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerController,
  requestResetEmailController,
} from '../controllers/auts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationShema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationShema.js';
import { requestResetEmailSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerController),
);
router.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh-session', ctrlWrapper(refreshUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default router;
