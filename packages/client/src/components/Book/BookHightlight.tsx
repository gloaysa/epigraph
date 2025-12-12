import { Blockquote, Paper, Stack, Text, ThemeIcon, Group } from '@mantine/core';
import type { IBook, IEntry } from '../../interfaces/book.interface';
import { useMemo } from 'react';
import { SelectableIcon } from '../SelectableIcon';
import './BookHightlight.css';

export interface BookHighlightProps {
  book: IBook;
  entry: IEntry;
}

/** Map KOReader color → Mantine color name (fallback to "yellow") */
function getHighlightColor(color?: string): string {
  switch (color?.toLowerCase()) {
    case 'red':
      return 'red';
    case 'orange':
      return 'orange';
    case 'yellow':
      return 'yellow';
    case 'green':
      return 'green';
    case 'olive':
      return 'lime';
    case 'cyan':
      return 'cyan';
    case 'blue':
      return 'blue';
    case 'purple':
      return 'grape';
    case 'gray':
      return 'gray';
    default:
      return 'yellow';
  }
}

/**
 * Displays a single highlight + its note in a social-friendly layout.
 */
export const BookHighlight = ({ book, entry }: BookHighlightProps) => {
  const highlightColor = useMemo(() => getHighlightColor(entry.color), [entry.color]);

  return (
    <Paper
      className='highlight-card'
      withBorder
      radius='lg'
      p='xl'
      shadow='sm'
    >
      <Stack
        className='highlight-card__content'
        gap='lg'
        h='100%'
        justify='space-between'
        align='flex-start'
      >
        <Stack
          className='highlight-card__body'
          gap='sm'
          align='flex-start'
          w='100%'
        >
          <Blockquote
            className='highlight-card__quote'
            color={highlightColor}
            radius='md'
            cite={`${book.title} - ${book.authors.join(',')}`}
            icon={
              <ThemeIcon
                className='highlight-card__quote-icon'
                color={highlightColor}
                radius='xl'
                size='xl'
              >
                <SelectableIcon />
              </ThemeIcon>
            }
          >
            {entry.text}
          </Blockquote>

          {entry.note && (
            <Stack
              className='highlight-card__note-block'
              gap={2}
              align='flex-start'
            >
              <Group
                className='highlight-card__note-header'
                gap={6}
                align='center'
              >
                <Text
                  className='highlight-card__note-label'
                  size='xs'
                  c='dimmed'
                  tt='uppercase'
                  fw={500}
                >
                  Note
                </Text>
              </Group>

              <Text
                className='highlight-card__note'
                size='sm'
                c='dimmed'
                fs='italic'
              >
                {entry.note}
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
