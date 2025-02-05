import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IStateType } from '../../utils/IState';

export type IDateContext = {
  date: IStateType<Date | undefined>;
};

export const DateContext = createContext<IDateContext>({} as IDateContext);
export const useDatePicker = () => useContext(DateContext);

export interface DatePickerProviderProps {
  date?: Date;
  children?: React.ReactNode;
}

export const DatePickerProvider: React.FC<DatePickerProviderProps> = ({
  date: initialValue,
  children,
}) => {
  const date = useState<Date | undefined>(initialValue);
  const value = useMemo(() => ({ date }), [date]);

  useEffect(() => {
    date[1](initialValue);
  }, [initialValue]);

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
