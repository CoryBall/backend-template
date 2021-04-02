import { Service } from 'typedi';

@Service()
class StorageConfig {
  key: string = process.env.AWS_ACCESS_KEY_ID ?? '';
  secret: string = process.env.AWS_SECRET_ACCESS_KEY ?? '';
  bucket: string = process.env.AWS_BUCKET ?? '';
  host: string = process.env.AWS_HOSTNAME ?? '';
}

export default StorageConfig;
