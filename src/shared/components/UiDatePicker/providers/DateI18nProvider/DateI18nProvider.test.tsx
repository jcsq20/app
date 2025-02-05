import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { DateI18nProvider, useDateI18n } from './DateI18nProvider';

/*
  Tests
*/

test('Should render', async () => {
  let c;
  await act(async () => {
    c = render(<DateI18nProvider />);
  });
  expect(c).toBeTruthy();
});

test('UseDateI18n should return the daynames and monthNames passed to the Provider', async () => {
  let hook: ReturnType<typeof useDateI18n>;
  const TestComponent = () => {
    hook = useDateI18n();
    return <></>;
  };
  await act(async () => {
    render(
      <DateI18nProvider dayNames={['Dom']} monthNames={[['Jan', 'Janeiro']]}>
        <TestComponent />
      </DateI18nProvider>
    );
  });
  expect(hook!.dayNames[0]).toEqual('Dom');
  expect(hook!.monthNames[0]).toEqual(['Jan', 'Janeiro']);
});
