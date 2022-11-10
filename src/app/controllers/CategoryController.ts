import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      return response.status(404).json({ message: 'Category not found' });
    }

    response.json(category);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    const categoryExist = await CategoriesRepository.findByName(name);

    if (categoryExist) {
      return response
        .status(400)
        .json({ error: 'There is already a category with that name' });
    }

    const category = await CategoriesRepository.create(name);

    response.status(201).json(category);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExist = await CategoriesRepository.findById(id);

    if (!categoryExist) {
      return response.status(404).json({ message: 'Category not found' });
    }

    const contact = await CategoriesRepository.update({
      id,
      name,
    });

    response.json(contact);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new CategoryController();
