import { render } from '@testing-library/react';
import * as Hooks from 'src/app/hooks';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { useUserAuthMock } from '../hooks/useUserAuth/mock';

vi.mock('src/app/hooks/', async () => {
  const existing = (await vi.importActual('src/app/hooks/')) as any;
  const module = {
    ...existing,
    useUserAuth: vi.fn(),
  };

  return module;
});

beforeAll(() => {
  import('src/modules/UsersModule/UsersModule');
  import('src/modules/AuthModule/AuthModule');
});

beforeEach(() => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation()
  );
});

test('Should Redirect to /signin', async () => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation({ isSignedIn: false })
  );
  const component = render(
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
  const view = await component.findAllByTestId('@signInView');
  expect(view).toBeTruthy();
});

test('Should Redirect to /users', async () => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation({ isSignedIn: true })
  );
  const component = render(
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
  const view = await component.findAllByTestId('@signInView');
  expect(view).toBeTruthy();
});
