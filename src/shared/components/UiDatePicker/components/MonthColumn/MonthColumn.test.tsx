import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import * as Hooks from '../../hooks';
import { useDateI18nMock } from '../../providers/DateI18nProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import { CustomInput } from '../../utils/CustomInput';

import MonthColumn from './MonthColumn';

vi.mock('../../hooks', () => ({
  useDateRef: vitest.fn(),
  useVisualizeDatePicker: vitest.fn(),
  useDateI18n: vitest.fn(),
}));

beforeEach(() => {
  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation()
  );

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation()
  );

  vi.spyOn(Hooks, 'useDateI18n').mockImplementation(
    useDateI18nMock().implementation()
  );
});

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<MonthColumn dates={[new Date(), new Date(), new Date()]} />);
  });
  expect(c).toBeTruthy();
});

test('Should select month', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [new Date('2000-1-1'), mock],
    })
  );

  await act(async () => {
    render(
      <MonthColumn dates={[new Date('2000-1-1'), new Date('2000-2-1')]} />
    );
  });
  const btn = screen.getByTestId('@monthBtn-1');
  btn.click();
  expect(mock).toBeCalled();
});

test('Should disable month min and max months', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [new Date('2000-2-1'), mock],
    })
  );

  const input = document.createElement('custom-input') as CustomInput;

  const minDate = new Date('2000-2-1');
  const maxDate = minDate;

  input.min = minDate.toISOString();
  (input as any).minAsDate = minDate;

  input.max = maxDate.toISOString();
  (input as any).maxAsDate = maxDate;

  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation({ current: input })
  );

  await act(async () => {
    render(
      <MonthColumn
        dates={[
          new Date('2000-1-1'),
          new Date('2000-2-1'),
          new Date('2000-3-1'),
        ]}
      />
    );
  });
  const btn0 = screen.getByTestId('@monthBtn-0') as HTMLButtonElement;
  const btn1 = screen.getByTestId('@monthBtn-1') as HTMLButtonElement;
  const btn2 = screen.getByTestId('@monthBtn-2') as HTMLButtonElement;

  expect(btn0.disabled).toBe(true);
  expect(btn1.disabled).toBe(false);
  expect(btn2.disabled).toBe(true);
});
