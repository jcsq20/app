import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import UiDatePicker from './UiDatePicker';

test('Should render with value', async () => {
  let c;
  await act(async () => {
    c = render(<UiDatePicker value={new Date('2000-1-1').toISOString()} />);
  });
  expect(c).toBeTruthy();
});

test('Should render with value', async () => {
  let c;
  await act(async () => {
    c = render(
      <UiDatePicker defaultValue={new Date('2000-1-1').toISOString()} />
    );
  });
  expect(c).toBeTruthy();
});

test('Should render without value', async () => {
  let c;
  await act(async () => {
    c = render(<UiDatePicker />);
  });
  expect(c).toBeTruthy();
});
