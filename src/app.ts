/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express, { Application } from 'express';
import morgan from 'morgan';
import { config } from './config';
import { AuthServer } from './internal/infrestructure/auth/server';
import { ProtectedServer } from './internal/infrestructure/protected/server';
import { errorHandler } from './utils/middlewares/errorHandler';
import { notFoundHandler } from './utils/middlewares/notFoundHandler';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

const router = express.Router();

AuthServer(app, router);
ProtectedServer(app, router);
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`listen on http://localhost:${config.port}`);
});

export = {
  app,
  server,
};
