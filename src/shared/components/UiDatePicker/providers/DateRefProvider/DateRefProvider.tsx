import React, {
  createContext,
  Ref,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { CustomInput } from '../../utils/CustomInput';
import { IDateContext } from '../DateProvider/DateProvider';

type IDateRef = React.RefObject<CustomInput>;

export const DateRefContext = createContext<IDateRef | null>(null);
export const useDateRef = () => useContext(DateRefContext);

interface DateRefProps {
  inputRef?: Ref<CustomInput> | undefined;
  children?: React.ReactNode;
  dateHook: () => IDateContext;
}

export const DateRefProvider: React.FC<DateRefProps> = ({
  inputRef,
  children,
  dateHook,
}) => {
  const ref = useRef<CustomInput>(null);
  const [date, setDate] = dateHook().date;
  const isDateUnSet = useRef(true);

  useEffect(() => {
    if (typeof inputRef === 'function') {
      inputRef(ref.current);
    } else {
      Object.assign(ref, inputRef);
    }
    if (isDateUnSet.current) {
      setTimeout(() => {
        setDate(ref.current?.valueAsDate || undefined);
        isDateUnSet.current = false;
      });
    }
    return () => {
      isDateUnSet.current = true;
    };
  }, [inputRef, setDate]);

  useEffect(() => {
    if (ref.current?.valueAsDate?.getTime() !== date?.getTime()) {
      const event = new Event('change', {
        bubbles: true,
        cancelable: true,
      });
      if (!isDateUnSet.current && ref.current) {
        ref.current.valueAsDate = date!;
      }
      if (!isDateUnSet.current) {
        ref.current?.dispatchEvent(event);
      }
    }
  }, [date]);

  return (
    <DateRefContext.Provider value={ref}>{children}</DateRefContext.Provider>
  );
};
