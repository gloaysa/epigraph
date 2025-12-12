import { Request, Response } from 'express';
import express from 'express';
import { BookService } from './book.service';
import { authMiddleware } from '../auth/auth.middleware';

const Router = express.Router();

Router.use(authMiddleware);

Router.get('/', async (req: Request, res: Response) => {
  const user = req.user;
  const response = await BookService.getBooks(user);
  return res.status(200).json({ data: response });
});

Router.get('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  if (!bookId || typeof bookId !== 'string') {
    return res.status(400).json({ error: 'Invalid book id' });
  }
  const response = await BookService.getBookById(bookId);

  if (!response) {
    return res.status(404).json({ error: 'Book not found' });
  }
  return res.status(200).json({ data: response });
});

export { Router as bookRouter };
