import { Popover } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import * as Hooks from '../../hooks';
import { useDateI18nMock } from '../../providers/DateI18nProvider/mock';
import { useDatePickerMock } from '../../providers/DateProvider/mock';
import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';

import PopoverContainer from './PopoverContainer';

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
    c = render(
      <Popover>
        <PopoverContainer />
      </Popover>
    );
  });
  expect(c).toBeTruthy();
});

test('Should render in month view', async () => {
  await act(async () => {
    render(
      <Popover>
        <PopoverContainer />
      </Popover>
    );
  });
  const view = screen.getByTestId('@datesView');
  expect(view).toBeTruthy();
});

test('Should render in year view', async () => {
  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({
      selectingYear: [true, () => undefined],
    })
  );
  await act(async () => {
    render(
      <Popover>
        <PopoverContainer />
      </Popover>
    );
  });
  const view = screen.getByTestId('@yearView');
  expect(view).toBeTruthy();
});
