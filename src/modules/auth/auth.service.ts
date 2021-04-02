import { UsersService } from '../users/users.service';
import { AuthPayload } from './auth.types';
import { ApolloError } from 'apollo-server-express';
import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '../../models';
import LoggerService from '../logger';
import { Inject, Service } from 'typedi';
import { AuthConfig } from '../../config';

@Service()
export class AuthService {
  @Inject()
  private readonly authConfig: AuthConfig;
  @Inject()
  private readonly usersService: UsersService;
  @Inject()
  private loggerService: LoggerService;

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(email);
    if (!user?.isActive) throw new ApolloError('account is inactive');
    if (!user?.validatePassword(password))
      throw new ApolloError('Invalid email or password');
    return this.signToken(user);
  }

  getTokenFromRequest(req: Request): string {
    return req.header('Authorization')?.split('Bearer ')[1] as string;
  }

  validateToken(token: string): User | undefined {
    try {
      const payload = verify(token, this.authConfig.secretToken) as {
        user: User;
      };
      if (payload?.user?.id) return payload.user;
    } catch (e) {
      this.loggerService.logger.error(e);
    }
    return;
  }

  signToken(user: User): AuthPayload {
    const accessUser = {
      id: user.id,
    };

    const accessToken: string = sign(
      { user: accessUser },
      this.authConfig.secretToken,
      {
        expiresIn: '1y',
      }
    );

    return {
      bearer: accessToken,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    } as AuthPayload;
  }
}
