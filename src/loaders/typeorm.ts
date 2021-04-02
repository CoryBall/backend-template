import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

export default async (): Promise<void> => {
  useContainer(Container);
  const connection = await createConnection();

  await connection.runMigrations({
    transaction: 'none',
  });
};
