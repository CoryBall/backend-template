import expressLoader from './express';
import apolloLoader from './apollo';
import typeormLoader from './typeorm';
import express, { Application } from 'express';
import { Container } from 'typedi';
import LoggerService from '../modules/logger';
import { ServerType } from './server.types';

export default async (): Promise<ServerType> => {
  const app: Application = express();
  const loggerService = Container.get(LoggerService);
  await typeormLoader();
  loggerService.logger.info('TypeORM Initialized');
  await expressLoader(app);
  loggerService.logger.info('Express Initialized');
  const server = await apolloLoader(app);
  loggerService.logger.info('Apollo Server Initialized');

  return server;
};
