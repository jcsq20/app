import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import { Header } from './Header';
import * as Hooks from '../../hooks';
import { useDateI18nMock } from '../../providers/DateI18nProvider/mock';
import { useDatePickerMock } from '../../providers/DateProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import { MONTH_NAMES } from '../../providers/DateI18nProvider/DateI18nProvider';
import { CustomInput } from '../../utils/CustomInput';

vi.mock('../../hooks', () => ({
  useDateRef: vitest.fn(),
  useVisualizeDatePicker: vitest.fn(),
  useDateI18n: vitest.fn(),
  useDatePicker: vitest.fn(),
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

  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation()
  );
});

test('Should render', async () => {
  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [undefined, () => undefined],
    })
  );

  let c;
  await act(async () => {
    c = render(<Header />);
  });
  expect(c).toBeTruthy();
});

test('Should render the Month name and year at header', async () => {
  const mockDate = new Date();

  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation({ date: [mockDate, () => undefined] })
  );

  const currentMonthName = MONTH_NAMES[mockDate.getMonth()][0];
  const fullTitleOnBtn = `${currentMonthName} ${mockDate.getFullYear()}`;

  await act(async () => {
    render(<Header />);
  });

  const bntTitleOnComponent = screen.getByTestId('@headerBtn').innerHTML;

  expect(fullTitleOnBtn).toEqual(bntTitleOnComponent);
});

test('Should display back translated', async () => {
  vi.spyOn(Hooks, 'useDateI18n').mockImplementation(
    useDateI18nMock().implementation({ selectingYearBackString: 'i18n!' })
  );

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      selectingYear: [true, () => undefined],
    })
  );

  await act(async () => {
    render(<Header />);
  });

  const bntTitleOnComponent = screen.getByTestId('@headerBtn').innerHTML;

  expect(bntTitleOnComponent).toEqual('i18n!');
});

test('Should disable arrows for year view', async () => {
  const input = document.createElement('custom-input') as CustomInput;

  const minDate = new Date();
  const maxDate = minDate;

  input.min = minDate.toISOString();
  (input as any).minAsDate = minDate;

  input.max = maxDate.toISOString();
  (input as any).maxAsDate = maxDate;

  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation({ current: input })
  );

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      selectingYear: [true, () => undefined],
    })
  );

  await act(async () => {
    render(<Header />);
  });

  const fbutton = screen.getByTestId('@forward') as HTMLButtonElement;

  expect(fbutton.disabled).toBe(true);

  const bbutton = screen.getByTestId('@backward') as HTMLButtonElement;

  expect(bbutton.disabled).toBe(true);
});

test('Should disable arrows for date view', async () => {
  const input = document.createElement('custom-input') as CustomInput;

  const minDate = new Date();
  const maxDate = minDate;

  input.min = minDate.toISOString();
  (input as any).minAsDate = minDate;

  input.max = maxDate.toISOString();
  (input as any).maxAsDate = maxDate;

  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation({ current: input })
  );

  await act(async () => {
    render(<Header />);
  });

  const fbutton = screen.getByTestId('@forward') as HTMLButtonElement;

  expect(fbutton.disabled).toBe(true);

  const bbutton = screen.getByTestId('@backward') as HTMLButtonElement;

  expect(bbutton.disabled).toBe(true);
});

test('Should backwards and forwards when is date view ', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [new Date('2020-12-1'), mock],
    })
  );

  await act(async () => {
    render(<Header />);
  });

  const fbutton = screen.getByTestId('@forward') as HTMLButtonElement;

  await act(async () => {
    fbutton.click();
  });

  expect(mock).toBeCalledTimes(1);

  const button = screen.getByTestId('@backward') as HTMLButtonElement;

  await act(async () => {
    button.click();
  });

  expect(mock).toBeCalledTimes(2);
});

test('Should backwards and forwards when is date year ', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      selectingYear: [true, vi.fn],
      yearScrollIndex: [20, (x) => mock.call((x as any).call())],
    })
  );

  await act(async () => {
    render(<Header />);
  });

  const fbutton = screen.getByTestId('@forward') as HTMLButtonElement;

  await act(async () => {
    fbutton.click();
  });

  expect(mock).toBeCalledTimes(1);

  const button = screen.getByTestId('@backward') as HTMLButtonElement;

  await act(async () => {
    button.click();
  });

  expect(mock).toBeCalledTimes(2);
});

test('Should fire changing from year view vs date view', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      selectingYear: [true, (x) => mock.call((x as any).call())],
    })
  );

  await act(async () => {
    render(<Header />);
  });

  const header = screen.getByTestId('@headerBtn');

  await act(async () => {
    header.click();
  });

  expect(mock).toBeCalledTimes(1);
});
