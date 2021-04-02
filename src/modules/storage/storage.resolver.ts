import {
  Arg,
  Args,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from 'type-graphql';
import { StorageTopic } from './storageTopics';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  UploadProgress,
  FileProgress,
  UploadProgressArgs,
} from './storage.types';
import { Inject, Service } from 'typedi';
import LoggerService from '../logger';
import { Image } from '../../models';
import { StorageService } from './storage.service';

@Service()
@Resolver()
class StorageResolver {
  @Inject() private storageService: StorageService;
  @Inject() private readonly loggerService: LoggerService;

  @Mutation(() => Image)
  async uploadImage(
    @Arg('file', () => GraphQLUpload, { nullable: false }) file: FileUpload,
    @PubSub(StorageTopic.UploadProgress)
    notifyAboutUploadProgress: Publisher<FileProgress>
  ): Promise<Image> {
    return await this.storageService.uploadImage(
      file,
      notifyAboutUploadProgress
    );
  }

  @Subscription(() => FileProgress, {
    topics: StorageTopic.UploadProgress,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<FileProgress, UploadProgressArgs>) => {
      return payload.fileName === args.fileName;
    },
  })
  uploadStatus(
    @Root() progress: FileProgress,
    @Args() { fileName }: UploadProgressArgs
  ): UploadProgress {
    this.loggerService.logger.info(`SUBSCRIPTION HIT. fileName: ${fileName}`);
    return progress;
  }
}

export default StorageResolver;
