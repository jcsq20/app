import { Box, Divider, Flex, IconButton } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useVisualizeDatePicker, useDateI18n, useDateRef } from '../../hooks';
import { getNearbyYears } from '../../utils/getNearbyYears';

export const Header: React.FC = () => {
  const context = useVisualizeDatePicker();
  const [contextDate, setDate] = context.date;
  const [selectingYear, setSelectingYear] = context.selectingYear;
  const [yearsIndex, setYearsIndex] = context.yearScrollIndex;
  const { monthNames, selectingYearBackString } = useDateI18n();
  const ref = useDateRef();

  const date = useMemo(() => contextDate || new Date(), [contextDate]);

  const month = date.getMonth();
  const year = date.getFullYear();

  const nextYears = useMemo(() => getNearbyYears(yearsIndex + 1), [yearsIndex]);
  const prevYears = useMemo(() => getNearbyYears(yearsIndex - 1), [yearsIndex]);

  const disableDir = useMemo(() => {
    const disables = {
      backward: false,
      forward: false,
    };

    if (ref?.current?.min) {
      const miny = ref?.current?.minAsDate.getFullYear();
      const minm = ref?.current?.minAsDate.getMonth();
      if (selectingYear) {
        disables.backward = prevYears.every((y) => y.getFullYear() < miny);
      } else {
        disables.backward = month === minm && miny === year;
      }
    }
    if (ref?.current?.max) {
      const maxy = ref?.current?.maxAsDate.getFullYear();
      const maxm = ref?.current?.maxAsDate.getMonth();
      if (selectingYear) {
        disables.forward = nextYears.every((y) => y.getFullYear() > maxy);
      } else {
        disables.forward = month === maxm && maxy === year;
      }
    }
    return disables;
  }, [ref, selectingYear, prevYears, month, year, nextYears]);

  const onChange = useCallback(
    (dir: 'forward' | 'backward') => () => {
      const terminator = dir === 'backward' ? 0 : 11;
      const adder = dir === 'backward' ? -1 : 1;

      if (selectingYear) {
        setYearsIndex((x) => (x || 0) + adder);
        return;
      }

      if (month === terminator) {
        date.setFullYear(year + adder, Math.abs(11 - month));
      } else {
        date.setMonth(month + adder);
      }

      setDate(new Date(date));
    },
    [selectingYear, month, setDate, date, setYearsIndex, year]
  );

  const onYearChange = () => {
    setSelectingYear((x) => !x);
  };

  const monthName = monthNames[date.getMonth()][0];

  return (
    <>
      <Flex alignItems="center" my={2}>
        <Box>
          <IconButton
            isDisabled={disableDir.backward}
            icon={<MdKeyboardArrowLeft />}
            size="sm"
            aria-label="previous"
            onClick={onChange('backward')}
            data-testid="@backward"
          />
        </Box>
        <Flex
          data-testid="@headerBtn"
          flex="1"
          justifyContent="center"
          fontWeight="bold"
          fontSize="large"
          userSelect="none"
          _hover={{ cursor: 'pointer' }}
          onClick={onYearChange}
        >
          {!selectingYear
            ? `${monthName} ${year}`
            : `${selectingYearBackString}`}
        </Flex>
        <Box>
          <IconButton
            isDisabled={disableDir.forward}
            icon={<MdKeyboardArrowRight />}
            size="sm"
            aria-label="next"
            onClick={onChange('forward')}
            data-testid="@forward"
          />
        </Box>
      </Flex>
      <Divider />
    </>
  );
};
