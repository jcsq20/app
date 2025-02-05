import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { DateVisualizerProvider } from './DateVisualizerProvider';

/*
  Tests
*/

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<DateVisualizerProvider />);
  });
  expect(c).toBeTruthy();
});
