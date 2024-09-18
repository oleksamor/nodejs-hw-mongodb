import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

contactsRouter.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export default contactsRouter;
