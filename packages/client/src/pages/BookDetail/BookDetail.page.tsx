import { Button, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { useLocation, useParams } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import type { IBook, IEntry } from '../../interfaces/book.interface';
import { useGetBookById } from '@/hooks/book.queries';
import { copyCitationToClipboard } from '@/utils/copy-to-clipboard';
import { EntryText } from '@/components/Book/EntryText';

export const BookDetailPage = () => {
  const [, setLocation] = useLocation();
  const { bookId } = useParams<{ bookId: string }>();
  const { book, bookLoading, bookError } = useGetBookById(bookId ?? '');

  if (bookLoading) {
    return <LoadingComponent />;
  }

  if (bookError) {
    return <ErrorComponent message={bookError.message} />;
  }

  if (!book) {
    return <NoBooksFound />;
  }

  const handleSelectBook = (book: IBook, entry: IEntry) => {
    setLocation(`/book/${book.id}/entry/${entry.id}`);
  };

  return (
    <Stack
      className='book-list-page'
      gap='sm'
    >
      <Stack
        className='book-detail__header'
        gap={4}
        align='flex-start'
      >
        <Text
          className='book-detail__title'
          fw={600}
          size='lg'
          ta='left'
        >
          {book.title}
        </Text>

        <Text
          className='book-detail__author'
          size='sm'
          c='dimmed'
          ta='left'
        >
          {book.authors.join(', ')}
        </Text>

        <Text
          className='book-detail__summary'
          size='xs'
          c='dimmed'
          ta='left'
        >
          {book.entries.length} highlight
          {book.entries.length === 1 ? '' : 's'} in this book
        </Text>
      </Stack>

      <Stack
        className='book-detail__entries'
        gap='md'
        align='flex-start'
        w='100%'
      >
        {book.entries.map((entry) => (
          <section
            key={`${entry.pn_xp}-${entry.time}`}
            className='book-item w-full'
            onClick={() => handleSelectBook(book, entry)}
          >
            <Paper
              className='book-detail__entry'
              withBorder
              radius='md'
              p='md'
              shadow='xs'
              w='100%'
            >
              <Stack
                className='book-detail__entry-inner'
                gap='xs'
                align='flex-start'
              >
                <div className='book-detail__entry-header flex gap-2 w-full align-items-center justify-content-between'>
                  <div className='flex gap-2'>
                    <Text
                      className='book-detail__entry-chapter'
                      size='xs'
                      c='dimmed'
                      ta='left'
                    >
                      <span className='font-bold'>{entry.chapter}</span>
                    </Text>
                    <Text
                      className='book-detail__entry-page'
                      size='xs'
                      c='dimmed'
                      ta='left'
                    >
                      Page {entry.page}
                    </Text>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      size='lg'
                      variant='subtle'
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCitationToClipboard(entry.text, book.authors.join(', '), book.title);
                      }}
                    >
                      <span>📋</span>
                    </Button>
                  </div>
                </div>

                <EntryText text={entry.text} />

                {!!entry.note && (
                  <Text
                    className='book-item__chip book-item__chip--notes'
                    size='lg'
                    variant='outline'
                  >
                    📝
                  </Text>
                )}
              </Stack>
            </Paper>
          </section>
        ))}
      </Stack>
    </Stack>
  );
};
