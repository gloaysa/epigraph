import { Button, Stack } from '@mantine/core';
import { BookListItem } from '../../components/Book/BookListItem';
import type { IBook } from '../../interfaces/book.interface';
import { useLocation } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import { useGetBooks } from '@/hooks/book.queries';

export const BookListPage = () => {
  const [, setLocation] = useLocation();

  const { books, booksLoading, booksError } = useGetBooks();

  const handleSelectBook = (book: IBook) => {
    setLocation(`/book/${book.id}`);
  };

  if (booksLoading) {
    return <LoadingComponent />;
  }

  if (booksError) {
    return <ErrorComponent message={booksError.message} />;
  }

  if (!books) {
    return <NoBooksFound />;
  }

  return (
    <Stack
      className='book-list-page'
      gap='sm'
    >
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onSelect={handleSelectBook}
        />
      ))}
    </Stack>
  );
};
