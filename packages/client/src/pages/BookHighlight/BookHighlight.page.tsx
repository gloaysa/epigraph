import { useParams } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import { Center } from '@mantine/core';
import { BookHighlight } from '../../components/Book/BookHightlight';
import { useGetBookById } from '@/hooks/book.queries';

export const BookHighlightPage = () => {
  const { bookId, entryId } = useParams();
  const { book, bookLoading, bookError } = useGetBookById(bookId ?? '');
  const entry = book?.entries.find((e) => e.id === entryId);

  if (bookLoading) {
    return <LoadingComponent />;
  }

  if (bookError) {
    return <ErrorComponent message={bookError.message} />;
  }

  if (!book || !entry) {
    return <NoBooksFound />;
  }

  return (
    <Center p='xl'>
      <BookHighlight
        book={book}
        entry={entry}
      />
    </Center>
  );
};
