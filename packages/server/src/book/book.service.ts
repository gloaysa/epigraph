import { readFile } from 'fs/promises';
import { BookResponse, KoReaderExport } from './book.dto';
import { existsSync } from 'fs';
import { User } from '../user/user.interface';

const BOOK_BASE_FOLDER = process.env.BOOKS_FOLDER ?? '';

class BookServiceClass {
  static instance: BookServiceClass;
  static getInstance(): BookServiceClass {
    if (!BookServiceClass.instance) {
      BookServiceClass.instance = new BookServiceClass();
    }
    return BookServiceClass.instance;
  }

  private books: BookResponse[] = [];

  async getBooks(user: User) {
    const filePath = `${BOOK_BASE_FOLDER}/${user.folder}/all.json`;
    if (!existsSync(filePath)) {
      throw new Error(`Couldn't find file at ${filePath}`);
    }
    const data = await readFile(filePath, 'utf8');

    const books = KoReaderExport.parse(data).books;
    this.books = books;
    return books;
  }

  async getBookById(bookId: string) {
    return this.books.find((b) => b.id === bookId);
  }
}

export const BookService = BookServiceClass.getInstance();
