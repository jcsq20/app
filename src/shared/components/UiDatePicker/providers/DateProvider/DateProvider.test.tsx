import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { DatePickerProvider, useDatePicker } from './DateProvider';

/*
  Tests
*/

test('Should render', async () => {
  let c;

  await act(async () => {
    c = render(<DatePickerProvider />);
  });
  expect(c).toBeTruthy();
});

test('useDatePicker should return the initial date', async () => {
  let c;
  await act(async () => {
    c = render(<DatePickerProvider />);
  });
  expect(c).toBeTruthy();
});

test('useDatePicker should return the date passed to the Provider', async () => {
  let hook: ReturnType<typeof useDatePicker>;
  const TestComponent = () => {
    hook = useDatePicker();
    return <></>;
  };
  await act(async () => {
    render(
      <DatePickerProvider date={new Date('2020-1-1')}>
        <TestComponent />
      </DatePickerProvider>
    );
  });
  expect(hook!.date[0]!.getTime()).toEqual(new Date('2020-1-1').getTime());
});
