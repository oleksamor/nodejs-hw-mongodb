import { Router } from 'express';
import router from './contacts.js';
import router from './auth.js';

const router = Router();
router.use('/contacts', router);

router.use('/auth', router);

export default router;
