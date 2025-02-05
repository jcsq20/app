import { HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useVisualizeDatePicker, useDateI18n } from '../../hooks';
import { getWeeksOfMonth } from '../../utils/getWeeksOfMonth';
import DateColumn from '../DateColumn/DateColumn';

const Dates: React.FC = () => {
  const [date] = useVisualizeDatePicker().date;
  const { dayNames } = useDateI18n();
  const [weeks, setWeeks] = useState<Date[][]>([]);

  useEffect(() => {
    setWeeks(getWeeksOfMonth(date || new Date()));
  }, [date]);

  return (
    <HStack data-testid="@datesView">
      {dayNames.map((title, idx) => (
        <DateColumn key={idx} title={title} dates={weeks[idx] || []} />
      ))}
    </HStack>
  );
};

export default Dates;
