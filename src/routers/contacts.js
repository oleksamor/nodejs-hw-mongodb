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

const router = Router();

router.use('/', authenticate);

router.get(
  '/contacts',
  validateBody(updateContactSchema),
  ctrlWrapper(getContactsController),
);

router.get(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(putContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(patchContactsController),
);
export default contactsRouter;
