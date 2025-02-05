import { Button, Flex } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useVisualizeDatePicker, useDateI18n, useDateRef } from '../../hooks';

interface MonthColumnProps {
  dates: Date[];
}

const MonthColumn: React.FC<MonthColumnProps> = ({ dates }) => {
  const [visualizeDate, setVisualizeDate] = useVisualizeDatePicker().date;
  const { monthNames } = useDateI18n();
  const ref = useDateRef();

  const isSelected = useCallback(
    (viewDate: Date) => {
      const sameMonth = viewDate.getMonth() === visualizeDate?.getMonth();
      const sameYear = viewDate.getFullYear() === visualizeDate?.getFullYear();
      return sameMonth && sameYear;
    },
    [visualizeDate]
  );

  const isDisabled = useCallback(
    (viewDate: Date) => {
      const minDate =
        ref?.current?.minAsDate &&
        new Date(
          ref?.current?.minAsDate.getFullYear(),
          ref?.current?.minAsDate.getMonth()
        );
      const maxDate =
        ref?.current?.maxAsDate &&
        new Date(
          ref?.current?.maxAsDate.getFullYear(),
          ref?.current?.maxAsDate.getMonth()
        );
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth());

      const isLessThenMinDate = minDate && date < minDate;
      const isHigherThenMaxDate = maxDate && date > maxDate;
      return isLessThenMinDate || isHigherThenMaxDate;
    },
    [ref]
  );

  const handleSelect = (n: Date) => () => {
    setVisualizeDate(new Date(n));
  };

  return (
    <Flex direction="column" flex-basis="0" justifyContent="center">
      {dates.map((viewDate, i) => (
        <Button
          data-testid={`@monthBtn-${i}`}
          key={i}
          mt={i > 0 ? '2' : undefined}
          size="sm"
          isDisabled={isDisabled(viewDate)}
          onClick={handleSelect(viewDate)}
          variant={
            isSelected(viewDate) && !isDisabled(viewDate) ? 'solid' : 'ghost'
          }
        >
          {monthNames[viewDate.getMonth()][1]}
        </Button>
      ))}
    </Flex>
  );
};

export default MonthColumn;
