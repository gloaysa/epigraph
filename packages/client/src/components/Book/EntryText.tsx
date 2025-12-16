import { FunctionComponent, useMemo } from 'react';
import { Text } from '@mantine/core';

interface IProps {
  text: string | undefined;
}
export const EntryText: FunctionComponent<IProps> = ({ text }) => {
  const textArray = useMemo(() => text?.split('\n') ?? [], [text]);

  return (
    <div className='entry-text flex'>
      <div className='flex flex-column gap-2'>
        {textArray.map((text, i) => (
          <Text
            key={`entry-text__item-${i}`}
            className='entry-text__item'
            size='sm'
            fw={500}
            lh={1.6}
            ta='left'
          >
            {text}
          </Text>
        ))}
      </div>
    </div>
  );
};
