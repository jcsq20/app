import { PopoverContent, PopoverBody } from '@chakra-ui/react';
import React from 'react';
import { useVisualizeDatePicker } from '../../hooks';
import Dates from '../Dates/Dates';
import { Header } from '../Header/Header';
import { YearsMonths } from '../YearsMonths/YearsMonths';

const PopoverContainer: React.FC = () => {
  const [selectingYear] = useVisualizeDatePicker().selectingYear;

  return (
    <PopoverContent w="auto">
      <PopoverBody>
        <Header />
        {selectingYear ? <YearsMonths /> : <Dates />}
      </PopoverBody>
    </PopoverContent>
  );
};

export default PopoverContainer;
