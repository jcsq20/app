import React, { createContext, useContext, useMemo } from 'react';

export const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTH_NAMES = [
  ['January', 'Jan'],
  ['February', 'Feb'],
  ['March', 'Mar'],
  ['April', 'Apr'],
  ['May', 'May'],
  ['June', 'Jun'],
  ['July', 'Jul'],
  ['August', 'Aug'],
  ['September', 'Sep'],
  ['October', 'Oct'],
  ['November', 'Nov'],
  ['December', 'Dec'],
];

export const SELECTING_YEAR_BACK_STRING = 'Back';

type IDateI18nContext = {
  monthNames: string[][];
  dayNames: string[];
  selectingYearBackString: string;
};

export const DateI18nContext = createContext<IDateI18nContext>(
  {} as IDateI18nContext
);
export const useDateI18n = () => useContext(DateI18nContext);

export interface DateI18nProviderProps {
  monthNames?: string[][];
  dayNames?: string[];
  selectingYearBackString?: string;
  children?: React.ReactNode;
}

export const DateI18nProvider: React.FC<DateI18nProviderProps> = ({
  monthNames = [],
  dayNames = [],
  selectingYearBackString,
  children,
}) => {
  const value = useMemo(
    () => ({
      monthNames: Object.assign([], MONTH_NAMES, monthNames),
      dayNames: Object.assign([], DAY_NAMES, dayNames),
      selectingYearBackString:
        selectingYearBackString || SELECTING_YEAR_BACK_STRING,
    }),
    [DAY_NAMES, MONTH_NAMES]
  );

  return (
    <DateI18nContext.Provider value={value}>
      {children}
    </DateI18nContext.Provider>
  );
};
