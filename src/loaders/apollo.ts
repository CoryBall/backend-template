import { Application, Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import {
  AuthResolver,
  UsersResolver,
  StorageResolver,
} from '../modules/resolvers';
import GraphqlAuthChecker from '../modules/auth/auth.apollo';
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as http from 'http';
import { ServerType } from './server.types';
import { Container } from 'typedi';

export default async (app: Application): Promise<ServerType> => {
  const options: Redis.RedisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379'),
    retryStrategy: (times) => Math.max(times * 100, 3000),
  };

  // create Redis-based pub-sub
  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UsersResolver, StorageResolver],
      validate: true,
      authChecker: GraphqlAuthChecker,
      container: Container,
      pubSub,
    }),
    introspection: true,
    playground: true,
    uploads: false,
    context: ({ req, res }: { req: Request; res: Response }) => {
      return { req, res } as DataContext;
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  return {
    apolloServer,
    app,
    httpServer,
  };
};
