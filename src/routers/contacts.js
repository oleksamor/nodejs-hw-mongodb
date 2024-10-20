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
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

contactsRouter.put(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(patchContactsController),
);
export default contactsRouter;
