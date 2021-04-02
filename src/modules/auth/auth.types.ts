import {Field, ID, InputType, ObjectType} from "type-graphql";

@InputType()
export class Credentials {
  @Field({nullable: false})
  email: string;
  @Field({nullable: false})
  password: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  bearer: string;

  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
