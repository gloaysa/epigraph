import { Button, Stack } from '@mantine/core';
import { BookListItem } from '../../components/Book/BookListItem';
import type { IBook } from '../../interfaces/book.interface';
import { useLocation } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import { useGetBooks, useRefreshBooks } from '@/hooks/book.queries';

export const BookListPage = () => {
  const [, setLocation] = useLocation();

  const { books, booksLoading, booksError } = useGetBooks();
  const { refreshBooks } = useRefreshBooks();

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
      <div className='flex justify-content-end'>
        <Button
          size='xs'
          variant='subtle'
          onClick={() => refreshBooks()}
          loading={booksLoading}
        >
          <span className='flex gap-2'>
            <span>↻</span> Refresh
          </span>
        </Button>
      </div>

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
