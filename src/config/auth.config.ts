import { Service } from 'typedi';

@Service()
class AuthConfig {
  secretToken: string;
  resetToken: string;
  roles: {
    user: 'USER';
    admin: 'ADMIN';
    superAdmin: 'SUPER_ADMIN';
  };

  constructor() {
    this.secretToken = process.env.JWT_SECRET ?? 'mySuperSecretAuthToken';
    this.resetToken = process.env.RESET_SECRET ?? 'mySuperSecretResetToken';
  }
}

export default AuthConfig;
