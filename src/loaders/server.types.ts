import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import * as http from 'http';

export type ServerType = {
  apolloServer: ApolloServer;
  app: Application;
  httpServer: http.Server;
};
