import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Authorized, Field, ObjectType } from 'type-graphql';
import { EntityBase } from './entityBase.entity';
import argon2 from 'argon2';
import Role from './role.entity';
import { IsPhoneNumber } from 'class-validator';

export enum AuthRole {
  User = 'USER',
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
}

@ObjectType()
@Entity({ name: 'users' })
class User extends EntityBase {
  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @IsPhoneNumber('US')
  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  isConfirmed: boolean;

  @Column()
  passwordHash: string;

  @Authorized([AuthRole.Admin, AuthRole.SuperAdmin])
  @Field(() => Boolean)
  @Column({ default: false, nullable: false })
  isActive: boolean;

  @Field(() => [Role])
  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @Column()
  tokenCount: number;

  async validatePassword(password: string): Promise<boolean> {
    try {
      return await argon2.verify(this.passwordHash, password);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // async generateConfirmToken(): Promise<void> {
  //   if (!AuthConfig.resetToken) {
  //     return;
  //   }
  //   // generate email or phone token and send it
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // verifyConfirmToken(token: string): boolean {
  //   if (!AuthConfig.resetToken) {
  //     return false;
  //   }
  //   // compare token with previously generated token and return comparison
  //   return true;
  // }

  // async generateResetToken(): Promise<void> {
  //   if (!AuthConfig.resetToken) {
  //     return;
  //   }
  //   // generate email or phone token and send it
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async verifyResetToken(token: string, newPassword: string): Promise<boolean> {
  //   if (!AuthConfig.secretToken) {
  //     return false;
  //   }
  //   // compare token and previously generated token and set password to newPassword
  //   return true;
  // }
}

export default User;
