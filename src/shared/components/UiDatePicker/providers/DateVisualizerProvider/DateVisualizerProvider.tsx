import React, { createContext, useContext, useMemo, useState } from 'react';
import { findYearIndex } from '../../utils/findYearIndex';
import { IStateType } from '../../utils/IState';

type IDateVisualizerContext = {
  date: IStateType<Date | undefined>;
  selectingYear: IStateType<boolean>;
  yearScrollIndex: IStateType<number>;
  disableDate?: (date: Date) => boolean;
};

export const DateVisualizerContext = createContext<IDateVisualizerContext>(
  {} as IDateVisualizerContext
);
export const useVisualizeDatePicker = () => useContext(DateVisualizerContext);

interface IDateVisualizerProviderProps {
  date?: Date;
  selectingYear?: boolean;
  disableDate?: (date: Date) => boolean;
  children?: React.ReactNode;
}

export const DateVisualizerProvider: React.FC<IDateVisualizerProviderProps> = ({
  selectingYear: initialSelectingYear,
  date: initialDate,
  disableDate,
  children,
}) => {
  const selectingYear = useState(!!initialSelectingYear);
  const yearScrollIndex = useState(findYearIndex(initialDate || new Date()));
  const date = useState(initialDate);

  const value = useMemo(
    () => ({
      selectingYear,
      yearScrollIndex,
      date,
      disableDate,
    }),
    [selectingYear, yearScrollIndex, disableDate]
  );

  return (
    <DateVisualizerContext.Provider value={value}>
      {children}
    </DateVisualizerContext.Provider>
  );
};
