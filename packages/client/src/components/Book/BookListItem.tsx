import { Badge, Group, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import type { IBook } from '../../interfaces/book.interface';

export interface BookItemProps {
  /** The KOReader book whose highlights/notes we want to display in the list. */
  book: IBook;
  /** Optional callback fired when the book is clicked. */
  onSelect?: (book: IBook) => void;
}

export const BookListItem = ({ book, onSelect }: BookItemProps) => {
  const highlightCount = book.entries.filter((e) => e.text?.trim()).length;
  const noteCount = book.entries.filter((e) => e.note?.trim()).length;

  const handleClick = () => {
    if (onSelect) onSelect(book);
  };

  return (
    <UnstyledButton
      type='button'
      onClick={handleClick}
      w='100%'
      className={`book-item`}
    >
      <Paper
        withBorder
        radius='lg'
        p='md'
        className='book-item__inner'
      >
        <Stack
          className='book-item__content'
          gap='xs'
        >
          <Stack
            className='book-item__header'
            gap={2}
          >
            <Text
              className='book-item__title'
              fw={600}
              size='sm'
            >
              {book.title}
            </Text>
            <Text
              className='book-item__author'
              size='xs'
              c='dimmed'
            >
              {book.author}
            </Text>
          </Stack>

          <Group
            className='book-item__meta'
            justify='space-between'
            align='center'
            gap='sm'
          >
            <Group
              className='book-item__meta-left'
              gap='xs'
              align='center'
              wrap='wrap'
            >
              <Badge
                className='book-item__chip'
                size='xs'
                variant='light'
                radius='xl'
              >
                {highlightCount} highlight{highlightCount === 1 ? '' : 's'}
              </Badge>

              {noteCount > 0 && (
                <Badge
                  className='book-item__chip book-item__chip--notes'
                  size='xs'
                  variant='outline'
                  radius='xl'
                >
                  {noteCount} note{noteCount === 1 ? '' : 's'}
                </Badge>
              )}
            </Group>

            <Text
              className='book-item__pages'
              size='xs'
              c='dimmed'
            >
              {book.number_of_pages} pages
            </Text>
          </Group>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
};
