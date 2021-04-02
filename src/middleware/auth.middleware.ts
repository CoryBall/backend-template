import { AuthService } from '../modules/auth/auth.service';
import { Container } from 'typedi';
import { Request, Response, NextFunction } from 'express';

async function validateTokensMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authService: AuthService = Container.get<AuthService>(AuthService);

  const authToken = authService.getTokenFromRequest(req);
  if (authToken) {
    req.user = authService.validateToken(authToken);
  }
  next();
}

export default validateTokensMiddleware;
