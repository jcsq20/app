import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import Providers from './DatePickerProvider';

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<Providers />);
  });
  expect(c).toBeTruthy();
});
