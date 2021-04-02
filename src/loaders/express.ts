import express, { Application } from 'express';
import cors from 'cors';
import validateTokensMiddleware from '../middleware/auth.middleware';
import { graphqlUploadExpress } from 'graphql-upload';

export default async (app: Application): Promise<Application> => {
  app
    .use(validateTokensMiddleware)
    .use(
      graphqlUploadExpress({ maxFileSize: 1000 * 1000 * 1000, maxFiles: 10 })
    ) // 1 gig upload max
    .use(express.json())
    .use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      })
    );

  return app;
};
