import {
  CloseButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Popover,
  PopoverAnchor,
  PopoverProps,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef } from 'react';
import { IoMdCalendar } from 'react-icons/io';
import { useDatePicker, useVisualizeDatePicker, useDateRef } from '../../hooks';
import { CustomInput } from '../../utils/CustomInput';
import PopoverContainer from '../PopoverContainer/PopoverContainer';

interface ContainerProps extends InputProps {
  format?: (date: Date) => string;
  popoverProps?: PopoverProps;
  inputGroupProps?: InputGroupProps;
}

const Container: React.FC<ContainerProps> = ({
  format,
  popoverProps,
  inputGroupProps,
  onChange,
  ...props
}) => {
  const dateInput = useDateRef();
  const visualInput = useRef<CustomInput>(null);
  const [date, setDate] = useDatePicker().date;
  const [, setVisualizeDate] = useVisualizeDatePicker().date;
  const [, setSelectingYear] = useVisualizeDatePicker().selectingYear;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = useCallback(
    (ev: React.ChangeEvent<CustomInput>) => {
      onChange?.(ev);
    },
    [onChange]
  );

  const handleFormat = useMemo(() => {
    if (date) {
      return format
        ? format(date)
        : new Intl.DateTimeFormat(navigator.language).format(date);
    }
    return '';
  }, [format, date]);

  const handleSetVisualizeDate = useCallback(() => {
    const isLessThenMinDate =
      date &&
      dateInput?.current?.minAsDate &&
      date < dateInput?.current?.minAsDate;
    const isHigherThenMaxDate =
      date &&
      dateInput?.current?.maxAsDate &&
      date > dateInput?.current?.maxAsDate;
    if (isLessThenMinDate || isHigherThenMaxDate) {
      const today = new Date();
      setVisualizeDate(
        today < dateInput?.current?.minAsDate
          ? dateInput?.current?.minAsDate
          : today
      );
    } else {
      setVisualizeDate(date);
    }
    setSelectingYear(false);
  }, [date, dateInput, setSelectingYear, setVisualizeDate]);

  const handleClean: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    setDate(undefined);
    ev.stopPropagation();
  };

  return (
    <Popover
      isLazy
      placement="bottom-start"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur
      {...popoverProps}
    >
      <PopoverAnchor>
        <InputGroup zIndex={0} {...inputGroupProps}>
          <InputLeftElement pointerEvents="none">
            <IoMdCalendar />
          </InputLeftElement>
          <Input
            data-testid="@visualizeInput"
            onFocus={onOpen}
            placeholder={props.placeholder}
            onClick={handleSetVisualizeDate}
            ref={visualInput}
            value={handleFormat || ''}
            isReadOnly
            isDisabled={props.isDisabled}
          />
          {date && !props.isDisabled && (
            <InputRightElement zIndex={0}>
              <CloseButton
                data-testid="@cleanBtn"
                size={inputGroupProps?.size}
                onClick={handleClean}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </PopoverAnchor>
      <PopoverContainer />
      <input
        ref={dateInput}
        is="custom-input"
        {...(props as React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >)}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </Popover>
  );
};

export default Container;
