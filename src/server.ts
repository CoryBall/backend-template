import 'reflect-metadata';
import loaders from './loaders';
import { Container } from 'typedi';
import LoggerService from './modules/logger';

async function startServer() {
  const loggerService = Container.get(LoggerService);
  const server = await loaders();
  const port = parseInt(process.env.SERVER_PORT ?? '4000');
  server.httpServer.listen(port);
  loggerService.logger.info(
    `🚀 Server ready at http://localhost:${port}${server.apolloServer.graphqlPath}`
  );
  loggerService.logger.info(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.apolloServer.subscriptionsPath}`
  );

  // app.listen({ port: process.env.SERVER_PORT }, () =>
  //   loggerService.logger.info(
  //     `[Server] Listening on http://localhost:${process.env.SERVER_PORT}`
  //   )
  // );
}

startServer().then();
