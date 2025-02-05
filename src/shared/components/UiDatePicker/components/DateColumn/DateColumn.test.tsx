import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import * as Hooks from '../../hooks';
import { useDatePickerMock } from '../../providers/DateProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import { CustomInput } from '../../utils/CustomInput';
import DateColumn from './DateColumn';

vi.mock('../../hooks', () => ({
  useDateRef: vitest.fn(),
  useVisualizeDatePicker: vitest.fn(),
  useDatePicker: vitest.fn(),
}));

beforeEach(() => {
  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation()
  );

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation()
  );

  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation()
  );
});

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<DateColumn dates={[new Date(), new Date()]} title="test" />);
  });
  expect(c).toBeTruthy();
});

test('Should select a date', async () => {
  const mock = vitest.fn();
  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation({ date: [new Date('2000-1-1'), mock] })
  );

  await act(async () => {
    render(<DateColumn dates={[new Date(), new Date()]} title="test" />);
  });

  const dateBtn = screen.getByTestId('@dateBnt-0');
  dateBtn.click();

  expect(mock).toBeCalled();
});

test('Dates should be disabled', async () => {
  const mock = vitest.fn();
  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation({ date: [new Date('2000-1-1'), mock] })
  );
  const input = document.createElement('custom-input') as CustomInput;

  const minDate = new Date('2000-1-1');
  const maxDate = minDate;

  input.min = minDate.toISOString();
  (input as any).minAsDate = minDate;

  input.max = maxDate.toISOString();
  (input as any).maxAsDate = maxDate;

  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation({ current: input })
  );

  await act(async () => {
    render(<DateColumn dates={[new Date(), new Date()]} title="test" />);
  });

  const dateBtn = screen.getByTestId('@dateBnt-0') as HTMLButtonElement;

  expect(dateBtn.disabled).toBe(true);
});
