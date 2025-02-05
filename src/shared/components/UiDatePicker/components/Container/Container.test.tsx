import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import * as Hooks from '../../hooks';
import { MONTH_NAMES } from '../../providers/DateI18nProvider/DateI18nProvider';
import { useDateI18nMock } from '../../providers/DateI18nProvider/mock';
import { useDatePickerMock } from '../../providers/DateProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import Container from './Container';

vi.mock('../../hooks', () => ({
  useDateRef: vitest.fn(),
  useVisualizeDatePicker: vitest.fn(),
  useDatePicker: vitest.fn(),
  useDateI18n: vitest.fn(),
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

  vi.spyOn(Hooks, 'useDateI18n').mockImplementation(
    useDateI18nMock().implementation()
  );
});

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<Container />);
  });
  expect(c).toBeTruthy();
});

test('Should format the date', async () => {
  await act(async () => {
    render(<Container format={() => 'FORMATTED'} />);
  });

  const input = screen.getByTestId('@visualizeInput') as HTMLInputElement;
  expect(input.value).toBe('FORMATTED');
});

test('Should open date picker', async () => {
  await act(async () => {
    render(<Container />);
  });

  const input = screen.getByTestId('@visualizeInput');

  await act(async () => {
    fireEvent.click(input);
    fireEvent.focus(input);
  });

  const view = screen.getByTestId('@datesView');
  expect(view).toBeTruthy();
});

test('Should open date picker min when today is less then min', async () => {
  const minDate = new Date('3000-1-1');
  const maxDate = minDate;
  await act(async () => {
    render(
      <Container
        value={minDate.toISOString()}
        min={minDate.toISOString()}
        max={maxDate.toISOString()}
      />
    );
  });

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [minDate, () => undefined],
    })
  );

  const visualInput = screen.getByTestId('@visualizeInput');

  await act(async () => {
    fireEvent.focus(visualInput);
    fireEvent.click(visualInput);
  });

  const view = screen.getByTestId('@headerBtn') as HTMLElement;

  const month = MONTH_NAMES[minDate.getMonth()][0];
  const year = minDate.getFullYear();

  expect(view.innerHTML).toBe(`${month} ${year}`);
});

test('Should open date picker today when min is less then today', async () => {
  const minDate = new Date('2000-1-1');
  const maxDate = minDate;
  await act(async () => {
    render(
      <Container
        value={minDate.toISOString()}
        min={minDate.toISOString()}
        max={maxDate.toISOString()}
      />
    );
  });

  const visualInput = screen.getByTestId('@visualizeInput');

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [new Date(), () => undefined],
    })
  );

  await act(async () => {
    fireEvent.focus(visualInput);
    fireEvent.click(visualInput);
  });

  const view = screen.getByTestId('@headerBtn') as HTMLElement;

  const month = MONTH_NAMES[new Date().getMonth()][0];
  const year = new Date().getFullYear();

  expect(view.innerHTML).toBe(`${month} ${year}`);
});

test('Should clean the field', async () => {
  const mock = vitest.fn();
  vi.spyOn(Hooks, 'useDatePicker').mockImplementation(
    useDatePickerMock().implementation({ date: [new Date(), mock] })
  );
  await act(async () => {
    render(<Container />);
  });

  const clean = screen.getByTestId('@cleanBtn');

  clean.click();

  expect(mock).toBeCalledWith(undefined);
});
