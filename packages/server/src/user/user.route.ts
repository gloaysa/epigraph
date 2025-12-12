import { Request, Response } from 'express';
import express from 'express';
import { UserService } from './user.service';
import { UserResponse } from './user.dto';

const Router = express.Router();

Router.get('/', async (req: Request, res: Response) => {
  const response = await UserService.getUsers();
  const users = response.map((u) => new UserResponse(u));
  return res.status(200).json({ data: users });
});

Router.get('/:bookId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user id' });
  }
  const response = await UserService.getUserById(userId);

  if (!response) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = new UserResponse(response);
  return res.status(200).json({ data: user });
});

export { Router as userRouter };
