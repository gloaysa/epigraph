import type { IBook } from '../interfaces/book.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from './api.service';
import { useCallback } from 'react';

const basePath = '/books';
const api = ApiService.getInstance();

export const BookQueries = {
  all: ['books'],
  byId: (id: string) => [...BookQueries.all, id],
};

export function useRefreshBooks() {
  const queryClient = useQueryClient();
  const { refetch } = useGetBooks();

  const refreshBooks = useCallback(() => {
    refetch();
    queryClient.invalidateQueries({
      queryKey: BookQueries.all,
    });
  }, [queryClient]);

  return { refreshBooks };
}

export function useGetBooks() {
  const {
    data: books,
    error: booksError,
    isFetching: booksLoading,
    ...options
  } = useQuery({
    queryKey: [...BookQueries.all],
    queryFn: async () => api.get<IBook[]>(`${basePath}`),
  });

  return { books, booksLoading, booksError, ...options };
}

export const useGetBookById = (bookId: string) => {
  const {
    data: book,
    error: bookError,
    isFetching: bookLoading,
    ...options
  } = useQuery({
    queryKey: [...BookQueries.byId(bookId)],
    queryFn: async () => api.get<IBook>(`${basePath}/${bookId}`),
    enabled: !!bookId,
  });

  return {
    book,
    bookLoading,
    bookError,
    ...options,
  };
};
