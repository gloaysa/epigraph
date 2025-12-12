import { Center, Paper, Stack, Text } from '@mantine/core';

export const LoadingComponent = () => (
  <Center
    className='book-list-page__state book-list-page__state--loading'
    p='xl'
  >
    <Text className='book-list-page__state-text'>Loading…</Text>
  </Center>
);

interface ErrorComponentProps {
  message: string;
}

export const ErrorComponent = ({ message }: ErrorComponentProps) => (
  <Center
    className='book-list-page__state book-list-page__state--error'
    p='xl'
  >
    <Paper
      className='book-list-page__error-card'
      withBorder
      radius='lg'
      p='md'
    >
      <Stack
        className='book-list-page__error-content'
        gap='xs'
        align='center'
      >
        <Text
          className='book-list-page__error-emoji'
          fz='xl'
        >
          😿
        </Text>

        <Text
          className='book-list-page__error-title'
          fw={600}
        >
          Something went wrong
        </Text>

        <Text
          className='book-list-page__error-message'
          size='sm'
        >
          {message}
        </Text>
      </Stack>
    </Paper>
  </Center>
);

export const NoBooksFound = () => (
  <Center
    className='book-list-page__state book-list-page__state--empty'
    p='xl'
  >
    <Paper
      className='book-list-page__empty-card'
      withBorder
      radius='lg'
      p='md'
    >
      <Stack
        className='book-list-page__empty-content'
        gap='xs'
        align='center'
      >
        <Text
          className='book-list-page__empty-emoji'
          fz='xl'
        >
          📚
        </Text>

        <Text
          className='book-list-page__empty-title'
          fw={600}
        >
          No books yet
        </Text>

        <Text
          className='book-list-page__empty-message'
          size='sm'
        >
          Sync your KOReader clippings JSON to the server and reload this page to see your highlights appear here.
        </Text>
      </Stack>
    </Paper>
  </Center>
);
