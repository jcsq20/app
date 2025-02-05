import { Divider, HStack } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { useVisualizeDatePicker } from '../../hooks';
import { getMonths } from '../../utils/getMonths';
import { getNearbyYears } from '../../utils/getNearbyYears';
import DateGroup from '../DateGroup/DateGroup';
import MonthColumn from '../MonthColumn/MonthColumn';
import YearColumn from '../YearColumn/YearColumn';

export const YearsMonths: React.FC = () => {
  const context = useVisualizeDatePicker();
  const [date] = context.date;
  const [yearsIndex] = context.yearScrollIndex;

  const dates = useCallback((dates: Date[]) => {
    const size = 6;
    let index = 0;
    const arrayLength = dates.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += size) {
      const chunk = dates.slice(index, index + size);
      tempArray.push(chunk);
    }

    return tempArray;
  }, []);

  const years = useMemo(() => dates(getNearbyYears(yearsIndex)), [yearsIndex]);

  const months = useMemo(
    () => dates(getMonths(date || new Date())),
    [date, dates]
  );

  return (
    <HStack data-testid="@yearView">
      <DateGroup title="">
        {months.map((months, i) => (
          <MonthColumn key={i} dates={months} />
        ))}
      </DateGroup>

      <Divider orientation="vertical" h="auto" alignSelf="stretch" />

      <DateGroup title="">
        {years.map((years, i) => (
          <YearColumn key={i} dates={years} />
        ))}
      </DateGroup>
    </HStack>
  );
};
