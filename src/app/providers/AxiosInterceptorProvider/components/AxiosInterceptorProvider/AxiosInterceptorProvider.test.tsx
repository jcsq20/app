import { act } from '@testing-library/react';
import { render } from 'src/shared/utils/tests/test-utils';
import * as Hooks from 'src/app/hooks';
import { useUserAuthMock } from 'src/app/hooks/useUserAuth/mock';
import { vi } from 'vitest';
import AxiosInterceptorProvider from './AxiosInterceptorProvider';

beforeEach(() => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation()
  );
});

test('should render the component', async () => {
  let component;

  await act(async () => {
    component = render(<AxiosInterceptorProvider />);
  });

  expect(component).toBeTruthy();
});
