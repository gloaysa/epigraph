import type { IBook } from '../interfaces/book.interface';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from './api.service';

const basePath = '/books';
const api = ApiService.getInstance();

export const BookQueries = {
  all: ['books'],
  byId: (id: string) => [...BookQueries.all, id],
};

export function useGetBooks() {
  const {
    data: books,
    error: booksError,
    isFetching: booksLoading,
  } = useQuery({
    queryKey: [...BookQueries.all],
    queryFn: async () => api.get<IBook[]>(`${basePath}`),
  });

  return { books, booksLoading, booksError };
}

export const useGetBookById = (bookId: string) => {
  const {
    data: book,
    error: bookError,
    isFetching: bookLoading,
  } = useQuery({
    queryKey: [...BookQueries.byId(bookId)],
    queryFn: async () => api.get<IBook>(`${basePath}/${bookId}`),
    enabled: !!bookId,
  });

  return {
    book,
    bookLoading,
    bookError,
  };
};
