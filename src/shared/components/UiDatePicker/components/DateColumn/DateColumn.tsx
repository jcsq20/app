import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useVisualizeDatePicker, useDatePicker, useDateRef } from '../../hooks';
import { adjustForTimezone } from '../../utils/adjustForTimezone';

interface ColumnProps {
  dates: Date[];
  title: string;
}

const DateColumn: React.FC<ColumnProps> = ({ dates, title }) => {
  const [, setVisualizeDate] = useVisualizeDatePicker().date;
  const { disableDate } = useVisualizeDatePicker();
  const [date, setDate] = useDatePicker().date;
  const ref = useDateRef();

  const isSelected = useCallback(
    (viewDate: Date) => {
      const sameDate = viewDate.getDate() === date?.getDate();
      const sameMonth = viewDate.getMonth() === date?.getMonth();
      const sameYear = viewDate.getFullYear() === date?.getFullYear();
      return sameDate && sameMonth && sameYear;
    },
    [date],
  );

  const isOutOfMonth = useCallback(
    (viewDate: Date, index: number) =>
      (index === 0 && viewDate.getDate() > 7) ||
      (index === dates.length - 1 && viewDate.getDate() <= 7),

    [dates],
  );

  const isDisabled = useCallback(
    (viewDate: Date) => {
      const isLessThenMinDate =
        ref?.current?.minAsDate &&
        viewDate < adjustForTimezone(ref?.current?.minAsDate);
      const isHigherThenMaxDate =
        ref?.current?.maxAsDate &&
        viewDate > adjustForTimezone(ref?.current?.maxAsDate);
      return (
        isLessThenMinDate || isHigherThenMaxDate || disableDate?.(viewDate)
      );
    },
    [ref, disableDate],
  );

  const handleSelect = (n: Date) => () => {
    setVisualizeDate(new Date(n));
    setDate(new Date(n));
  };

  return (
    <Flex direction="column" flex-basis="0" justifyContent="center">
      <Box my={2} textAlign="center" fontWeight="semibold">
        {title}
      </Box>
      {dates.map((viewDate, i) => (
        <Button
          data-testid={`@dateBnt-${i}`}
          key={i}
          mt={i > 0 ? '2' : undefined}
          size="sm"
          isDisabled={isDisabled(viewDate)}
          onClick={handleSelect(viewDate)}
          variant={
            isSelected(viewDate) && !isDisabled(viewDate) ? 'solid' : 'ghost'
          }
          color={isOutOfMonth(viewDate, i) ? 'neutral.500' : undefined}
        >
          {viewDate.getDate()}
        </Button>
      ))}
    </Flex>
  );
};

export default DateColumn;
