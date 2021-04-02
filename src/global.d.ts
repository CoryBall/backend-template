import {User} from "./models";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
  type DataContext = {
    req: Express.Request;
    res: Express.Response;
  }
  type Nullable<T> = T | null;
}
