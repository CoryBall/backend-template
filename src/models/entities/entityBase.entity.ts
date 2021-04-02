import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class EntityBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn({ nullable: false })
  created: Date;

  @Field(() => Date)
  @UpdateDateColumn({ nullable: false })
  modified: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deleted: Date;
}
