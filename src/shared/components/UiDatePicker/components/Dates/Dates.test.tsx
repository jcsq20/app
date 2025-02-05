import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import Dates from './Dates';

import * as Hooks from '../../hooks';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import { useDateI18nMock } from '../../providers/DateI18nProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useDatePickerMock } from '../../providers/DateProvider/mock';

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
  let c;
  await act(async () => {
    c = render(<Dates />);
  });
  expect(c).toBeTruthy();
});

test('Should render without date on visualizer provider', async () => {
  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      date: [undefined, () => undefined],
    })
  );
  let c;
  await act(async () => {
    c = render(<Dates />);
  });
  expect(c).toBeTruthy();
});
