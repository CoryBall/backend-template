import * as aws from 'aws-sdk';
import { FileUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server-express';
import { FileProgress } from './storage.types';
import { Inject, Service } from 'typedi';
import { StorageConfig } from '../../config';
import { Image } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';

@Service()
export class StorageService {
  @Inject()
  private readonly storageConfig: StorageConfig;

  async uploadImage(
    file: FileUpload,
    progressCallback: (progress: FileProgress) => Promise<void>
  ): Promise<Image> {
    const s3Client = new aws.S3({
      endpoint: new aws.Endpoint(this.storageConfig.host),
      params: {
        ACL: 'public-read',
        Bucket: this.storageConfig.bucket,
      },
    });

    if (!file) throw new ApolloError('Invalid file uploaded');
    const { createReadStream, filename, encoding } = file;
    const mimetype = mime.lookup(filename) || 'application/octet-stream';

    if (!file) throw new ApolloError('Invalid file uploaded');

    try {
      const { Location } = await s3Client
        .upload({
          Body: createReadStream(),
          Bucket: this.storageConfig.bucket,
          Key: `test/${uuidv4()}`,
          ContentType: mimetype,
          ContentDisposition: `attachment;filename=${filename}`,
        })
        .on(
          'httpUploadProgress',
          async (progress: aws.S3.ManagedUpload.Progress) => {
            if (progress.total !== undefined) {
              const fileProgress = new FileProgress();
              fileProgress.fileName = filename;
              fileProgress.complete = progress.loaded;
              fileProgress.total = progress.total;
              await progressCallback(fileProgress);
            }
          }
        )
        .promise();
      return { filename, mimetype, encoding, url: Location } as Image;
    } catch (e) {
      console.error(e);
      throw new ApolloError('Could not upload file');
    }
  }
}
