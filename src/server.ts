import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import { routes } from './routes';

const app = express();

app.use(express.json());

app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Method', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.log(error);
    response.sendStatus(500);
  },
);

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log('🔥 Server started at http://localhost:3333'),
);
