import { Button, Flex } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useVisualizeDatePicker, useDateRef } from '../../hooks';

interface YearColumnProps {
  dates: Date[];
}

const YearColumn: React.FC<YearColumnProps> = ({ dates }) => {
  const [visualizeDate, setVisualizeDate] = useVisualizeDatePicker().date;
  const ref = useDateRef();

  const isSelected = useCallback(
    (viewDate: Date) => viewDate.getFullYear() === visualizeDate?.getFullYear(),
    [visualizeDate]
  );

  const isDisabled = useCallback(
    (viewDate: Date) => {
      const isLessThenMinDate =
        ref?.current?.minAsDate &&
        viewDate.getFullYear() < ref?.current?.minAsDate.getFullYear();
      const isHigherThenMaxDate =
        ref?.current?.maxAsDate &&
        viewDate.getFullYear() > ref?.current?.maxAsDate.getFullYear();
      return isLessThenMinDate || isHigherThenMaxDate;
    },
    [ref]
  );

  const handleSelect = useCallback(
    (viewDate: Date) => () => {
      const date = new Date(viewDate);
      date.setMonth(visualizeDate?.getMonth() || 0);
      setVisualizeDate(date);
    },
    [setVisualizeDate, visualizeDate]
  );

  return (
    <Flex direction="column" flex-basis="0" justifyContent="center">
      {dates.map((viewDate, i) => (
        <Button
          data-testid={`@yearBtn-${i}`}
          key={i}
          mt={i > 0 ? '2' : undefined}
          size="sm"
          isDisabled={isDisabled(viewDate)}
          onClick={handleSelect(viewDate)}
          variant={
            isSelected(viewDate) && !isDisabled(viewDate) ? 'solid' : 'ghost'
          }
        >
          {viewDate.getFullYear()}
        </Button>
      ))}
    </Flex>
  );
};

export default YearColumn;
