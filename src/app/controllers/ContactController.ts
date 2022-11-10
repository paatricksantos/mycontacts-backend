import { Request, Response } from 'express';

import ContactsRepository from '../repositories/ContactsRepository';
import isValidUUID from '../utils/isValidUUID';

class ContactController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    const orderBy = request.query.orderBy === 'desc' ? 'desc' : 'asc';
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    const { name, email, phone, category_id } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const contactExist = await ContactsRepository.findByEmail(email);
      if (contactExist) {
        return response
          .status(404)
          .json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request: Request, response: Response) {
    // Editar um registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (email) {
      const contactExist = await ContactsRepository.findById(id);
      if (!contactExist) {
        return response.status(404).json({ message: 'Contact not found' });
      }
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update({
      id,
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request: Request, response: Response) {
    // Deletar um registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found' });
    }
    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton -> Somente uma instância da classe na aplicação
export default new ContactController();
