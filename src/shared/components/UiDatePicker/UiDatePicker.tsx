import { InputGroupProps, InputProps, PopoverProps } from '@chakra-ui/react';
import React, { Ref } from 'react';
import { Container } from './components';
import { useDatePicker } from './hooks';
import { DatePickerProvider, DateRefProvider } from './providers';
import { CustomInput } from './utils/CustomInput';

customElements.define('custom-input', CustomInput, {
  extends: 'input',
});

export interface UiDatePickerProps extends InputProps {
  ref?: Ref<CustomInput>;
  // Input Augmentation
  // Extras
  format?: (date: Date) => string;
  monthNames?: string[][];
  dayNames?: string[];
  selectingYearBackString?: string;
  // Child Components props
  popoverProps?: PopoverProps;
  inputGroupProps?: InputGroupProps;

  disableDate?: (date: Date) => boolean;
}

const UiDatePicker: React.FC<UiDatePickerProps> = React.forwardRef<
  CustomInput,
  UiDatePickerProps
>(
  (
    {
      popoverProps,
      monthNames,
      dayNames,
      selectingYearBackString,
      disableDate,
      ...props
    },
    ref,
  ) => {
    const initValue = props.value || props.defaultValue;
    const date = initValue ? new Date(initValue as string) : undefined;
    return (
      <DatePickerProvider
        dateI18nProviderProps={{
          monthNames,
          dayNames,
          selectingYearBackString,
        }}
        datePickerProviderProps={{ date }}
        disableDate={disableDate}
      >
        <DateRefProvider inputRef={ref} dateHook={useDatePicker}>
          <Container {...props} />
        </DateRefProvider>
      </DatePickerProvider>
    );
  },
) as any;

export default UiDatePicker;
