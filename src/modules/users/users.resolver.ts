import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { UsersService } from './users.service';
import { ApolloError } from 'apollo-server-express';
import { Inject, Service } from 'typedi';
import { User } from '../../models';

@Service()
@Resolver()
class UsersResolver {
  @Inject()
  private usersService: UsersService;

  @Authorized()
  @Query(() => User, { nullable: false })
  async me(@Ctx() { req }: DataContext): Promise<User> {
    if (!req?.user?.id) throw new ApolloError('Please log in');
    const user = await this.usersService.findById(req?.user?.id);
    if (!user) throw new ApolloError('Could not verify user. Please log in.');
    return user;
  }
}

export default UsersResolver;
