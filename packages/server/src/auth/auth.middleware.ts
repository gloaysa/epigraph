import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['user-id'];
  if (!userId || typeof userId !== 'string') {
    return res.status(403).json({ error: 'Select an user first!' });
  }

  const user = await UserService.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'Selected user not found!' });
  }

  req.user = user;

  next();
};
