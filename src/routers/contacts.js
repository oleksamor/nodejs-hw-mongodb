import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  deleteContactController,
  putContactController,
  patchContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.get(
  '/',
  validateBody(updateContactSchema),
  ctrlWrapper(getContactsController),
);

router.get(
  '/:contactId',
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(putContactController),
);

router.patch(
  '/:contactId',

  upload.single('photo'),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactsController),
);
export default router;
