import { User } from '../user/user.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: User;
  }
}
