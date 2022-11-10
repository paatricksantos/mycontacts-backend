import { Router } from 'express';

import CategoryController from './app/controllers/CategoryController';
import ContactController from './app/controllers/ContactController';

export const routes = Router();

routes.get('/contacts', ContactController.index);
routes.get('/contacts/:id', ContactController.show);
routes.post('/contacts', ContactController.store);
routes.delete('/contacts/:id', ContactController.delete);
routes.put('/contacts/:id', ContactController.update);

routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);
routes.post('/categories', CategoryController.store);
routes.delete('/categories/:id', CategoryController.delete);
routes.put('/categories/:id', CategoryController.update);
