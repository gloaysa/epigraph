import { Button, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { useLocation, useParams } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import type { IBook, IEntry } from '../../interfaces/book.interface';
import { useGetBookById, useRefreshBooks } from '@/hooks/book.queries';
import { copyCitationToClipboard } from '@/utils/copy-to-clipboard';

export const BookDetailPage = () => {
  const [, setLocation] = useLocation();
  const { bookId } = useParams<{ bookId: string }>();
  const { book, bookLoading, bookError } = useGetBookById(bookId ?? '');
  const { refreshBooks } = useRefreshBooks();

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
      <div className='flex justify-content-end'>
        <Button
          size='xs'
          variant='subtle'
          onClick={() => refreshBooks()}
          loading={bookLoading}
        >
          <span className='flex gap-2'>
            <span>↻</span> Refresh
          </span>
        </Button>
      </div>

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

        {book.authors.map((author) => (
          <Text
            className='book-detail__author'
            size='sm'
            c='dimmed'
            ta='left'
          >
            {author}
          </Text>
        ))}

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
          <UnstyledButton
            key={`${entry.pn_xp}-${entry.time}`}
            type='button'
            onClick={() => handleSelectBook(book, entry)}
            w='100%'
            className={`book-item`}
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
                <div className='book-detail__entry-meta flex gap-2 w-full align-items-center justify-content-between'>
                  <div className='flex gap-2'>
                    <Text
                      className='book-detail__entry-chapter'
                      size='xs'
                      c='dimmed'
                      ta='left'
                    >
                      {entry.chapter}
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
                      size='xs'
                      variant='subtle'
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCitationToClipboard(entry.text, book.authors.join(','), book.title);
                      }}
                    >
                      <span className='flex gap-2'>
                        <span>📋</span>
                      </span>
                    </Button>
                  </div>
                </div>

                <Text
                  className='book-detail__entry-quote'
                  size='sm'
                  fw={500}
                  lh={1.6}
                  ta='left'
                >
                  “{entry.text}”
                </Text>

                {!!entry.note && (
                  <Text
                    className='book-item__chip book-item__chip--notes'
                    size='xs'
                    variant='outline'
                  >
                    🗒️
                  </Text>
                )}
              </Stack>
            </Paper>
          </UnstyledButton>
        ))}
      </Stack>
    </Stack>
  );
};
