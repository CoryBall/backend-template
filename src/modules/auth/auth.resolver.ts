import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthService } from './auth.service';
import { AuthPayload, Credentials } from './auth.types';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
class AuthResolver {
  @Inject()
  private authService: AuthService;

  @Mutation(() => AuthPayload, { nullable: true })
  async login(
    @Arg('credentials', { nullable: false }) credentials: Credentials
  ): Promise<AuthPayload> {
    return await this.authService.login(
      credentials.email,
      credentials.password
    );
  }
}

export default AuthResolver;
