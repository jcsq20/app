import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DateGroup from './DateGroup';

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<DateGroup title="Test" />);
  });
  expect(c).toBeTruthy();
});
