import { Popover } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, vitest } from 'vitest';
import * as Hooks from '../../hooks';

import { useDateRefMock } from '../../providers/DateRefProvider/mock';
import { useVisualizeDatePickerMock } from '../../providers/DateVisualizerProvider/mock';
import { CustomInput } from '../../utils/CustomInput';
import YearColumn from './YearColumn';

vi.mock('../../hooks', () => ({
  useDateRef: vitest.fn(),
  useVisualizeDatePicker: vitest.fn(),
}));

beforeEach(() => {
  vi.spyOn(Hooks, 'useDateRef').mockImplementation(
    useDateRefMock().implementation()
  );

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation()
  );
});

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(
      <Popover>
        <YearColumn dates={[]} />
      </Popover>
    );
  });
  expect(c).toBeTruthy();
});

test('Should select year', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({ date: [undefined, mock] })
  );

  await act(async () => {
    render(
      <Popover>
        <YearColumn dates={[new Date('2000-1-1')]} />
      </Popover>
    );
  });

  screen.getByTestId('@yearBtn-0').click();

  expect(mock).toBeCalled();
});

test('Should be disabled year for max and min', async () => {
  const mock = vitest.fn();

  vi.spyOn(Hooks, 'useVisualizeDatePicker').mockImplementation(
    useVisualizeDatePickerMock().implementation({ date: [undefined, mock] })
  );

  const input = document.createElement('custom-input') as CustomInput;

  const minDate = new Date('2001-1-1');
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
      <Popover>
        <YearColumn
          dates={[
            new Date('2000-1-1'),
            new Date('2001-1-1'),
            new Date('2002-1-1'),
          ]}
        />
      </Popover>
    );
  });

  screen.getByTestId('@yearBtn-0').click();
  screen.getByTestId('@yearBtn-1').click();
  screen.getByTestId('@yearBtn-2').click();

  expect(mock).toBeCalledTimes(1);
});
