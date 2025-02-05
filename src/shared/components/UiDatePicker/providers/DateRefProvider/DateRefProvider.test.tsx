import { act } from 'react-dom/test-utils';
import { RefObject } from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { DateRefProvider } from './DateRefProvider';
import * as Hooks from '../../hooks';
import { CustomInput } from '../../utils/CustomInput';
import { useDatePickerMock } from '../DateProvider/mock';
import { useDatePicker } from '../../hooks';

/*
  Tests
*/

beforeEach(() => {
  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation({
      date: [new Date('2000-1-1'), () => undefined],
    })
  );
});

vi.useFakeTimers();

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(
      <DateRefProvider inputRef={() => undefined} dateHook={useDatePicker} />
    );
  });
  expect(c).toBeTruthy();
});

test('Should not set initial value to the ref once the dates are diff', async () => {
  const input = document.createElement('custom-input');

  const ref = { current: input } as RefObject<CustomInput>;
  const date = new Date('2000-1-1');
  ref.current!.valueAsDate = date;

  const mockFn = vi.fn();
  ref.current!.addEventListener('change', mockFn);

  await act(async () => {
    render(<DateRefProvider inputRef={ref} dateHook={useDatePicker} />);
  });
  expect(mockFn).not.toBeCalled();
});
