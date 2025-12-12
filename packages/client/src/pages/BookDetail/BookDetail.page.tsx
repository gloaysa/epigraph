import { Center, Group, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { useLocation, useParams } from 'wouter';
import { ErrorComponent, LoadingComponent, NoBooksFound } from '../../components/Book/BookStatus';
import type { IBook, IEntry } from '../../interfaces/book.interface';
import { useGetBookById } from '@/hooks/book.queries';

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
    <Center
      className='book-detail'
      p='xl'
    >
      <Stack
        className='book-detail__content'
        w='100%'
        maw={800}
        gap='lg'
        align='flex-start'
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
            {book.author}
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
                  <Group
                    className='book-detail__entry-meta'
                    gap='sm'
                    align='center'
                  >
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
                  </Group>

                  <Text
                    className='book-detail__entry-quote'
                    size='sm'
                    fw={500}
                    lh={1.6}
                    ta='left'
                  >
                    “{entry.text}”
                  </Text>

                  {entry.note && (
                    <Stack
                      className='book-detail__entry-note-block'
                      gap={2}
                      align='flex-start'
                    >
                      <Text
                        className='book-detail__entry-note-label'
                        size='xs'
                        c='dimmed'
                        tt='uppercase'
                        fw={500}
                        ta='left'
                      >
                        Note
                      </Text>
                      <Text
                        className='book-detail__entry-note'
                        size='xs'
                        c='dimmed'
                        fs='italic'
                        ta='left'
                      >
                        {entry.note}
                      </Text>
                    </Stack>
                  )}
                </Stack>
              </Paper>
            </UnstyledButton>
          ))}
        </Stack>
      </Stack>
    </Center>
  );
};
