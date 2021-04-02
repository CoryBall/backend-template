import { ArgsType, Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UploadProgress {
  @Field()
  complete: number;
  @Field()
  total: number;
  fileName: string;
}

@ArgsType()
export class UploadProgressArgs {
  @Field()
  fileName: string;
}

@ObjectType()
export class FileProgress {
  @Field()
  complete: number;
  @Field()
  total: number;
  // @Field()
  // percent(): number {
  //   return (this.complete / this.total) * 100;
  // }
  fileName: string;
}
