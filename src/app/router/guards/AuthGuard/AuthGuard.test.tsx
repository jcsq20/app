import * as ReactRouterDom from 'react-router-dom';

import { render } from 'src/shared/utils/tests/test-utils';
import * as Hooks from 'src/app/hooks';
import { useUserAuthMock } from 'src/app/hooks/useUserAuth/mock';
import { vi } from 'vitest';
import AuthGuard from './AuthGuard';

// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom') as any),
//   Navigate: jest.fn(),
// }));
// convert the above jest.mock to vitest.mock
vi.mock('react-router-dom', async () => {
  const existing = (await vi.importActual('react-router-dom')) as any;
  const module = {
    ...existing,
    Navigate: vi.fn(),
  };
  return module;
});

// jest.mock('src/app/hooks/', () => ({
//   ...(jest.requireActual('src/app/hooks/') as any),
//   useUserAuth: jest.fn(),
// }));

vi.mock('src/app/hooks/', async () => {
  const existing = (await vi.importActual('src/app/hooks/')) as any;
  const module = {
    ...existing,
    useUserAuth: vi.fn(),
  };
  return module;
});

beforeEach(() => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation()
  );
});

test('Should Redirect', async () => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation({ isSignedIn: false, user: undefined })
  );

  render(<AuthGuard component={<div data-testid="test" />} />);

  const { Navigate } = await import('react-router-dom');
  vi.spyOn(ReactRouterDom, 'Navigate');

  expect(Navigate).toBeCalled();
});

test('Should allow render', async () => {
  const component = render(
    <AuthGuard component={<div data-testid="test" />} />
  );

  const div = component.findByTestId('test');
  expect(div).toBeTruthy();
});
