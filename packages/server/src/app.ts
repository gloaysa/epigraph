import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // hack to catch async errors in error handling middleware (at the bottom).
import 'reflect-metadata';
import cors from 'cors';
import { bookRouter } from './book/book.route';
import { userRouter } from './user/user.route';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

app.use('/api/health', (req, res) => {
  res.status(200).json({
    env: process.env.NODE_ENV,
    api: process.env.API_URL,
  });
});

app.use('/api/', (_req, res) => {
  res.status(404).json({ error: 'oh, no!' });
});

const clientPath = path.resolve(__dirname, '../client');

app.use('/', express.static(clientPath));
app.get('/*', (_req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Error middleware - must be at the end
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }
  return res.status(500).json({ error: `${err}` });
});

export { app };
