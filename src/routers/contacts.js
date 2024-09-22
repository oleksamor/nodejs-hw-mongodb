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
import { createContactSchema } from '../validation/contacts.js';
// createContactSchema
const contactsRouter = Router();

contactsRouter.get(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(deleteContactController),
);

contactsRouter.put(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(patchContactsController),
);

export default contactsRouter;
