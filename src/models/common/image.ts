import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Image {
  @Field()
  filename: string;
  @Field()
  mimetype: string;
  @Field()
  encoding: string;
  @Field()
  url: string;
}
