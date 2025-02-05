import * as ReactRouterDom from 'react-router-dom';

import { render } from 'src/shared/utils/tests/test-utils';
import { act, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API, appAxios } from 'src/shared/api';
import { vi } from 'vitest';
import UserGuard from './UserGuard';

vi.mock('react-router-dom', async () => {
  const existing = (await vi.importActual('react-router-dom')) as any;
  const module = {
    ...existing,
    Navigate: vi.fn(),
    useParams: vi.fn(),
  };
  return module;
});

vi.useFakeTimers();

const appAxiosMock = new MockAdapter(appAxios);

beforeEach(() => {
  appAxiosMock.reset();
});

test('Should render with user resolver', async () => {
  const id = 1;
  vi.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: id.toString() });

  appAxiosMock.onGet(API.Users.URLS.getById(id)).reply(200, { id });

  await act(async () => {
    render(
      <UserGuard>
        {(user) => <div data-testid={`@test-${user.id}`} />}
      </UserGuard>
    );
  });

  await act(async () => {
    vi.runAllTimers();
  });

  const div = screen.getByTestId(`@test-${id}`);
  expect(div).toBeTruthy();
});

test('Should render without user resolver', async () => {
  const id = 1;
  vi.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: id.toString() });

  appAxiosMock.onGet(API.Users.URLS.getById(id)).reply(200, { id });

  await act(async () => {
    render(<UserGuard component={<div data-testid="test" />} />);
  });

  await act(async () => {
    vi.runAllTimers();
  });

  const div = screen.getByTestId('test');
  expect(div).toBeTruthy();
});

test('Should redirect', async () => {
  const id = 1;
  vi.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: id.toString() });

  appAxiosMock.onGet(API.Users.URLS.getById(id)).reply(404);

  const { Navigate } = await import('react-router-dom');
  vi.spyOn(ReactRouterDom, 'Navigate');

  await act(async () => {
    render(<UserGuard>{() => <div data-testid="test" />}</UserGuard>);
  });
  // Run Use query and axios mocks requests
  await act(async () => {
    vi.runAllTimers();
  });

  const div = screen.queryByTestId('test');

  expect(div).toBeFalsy();
  expect(Navigate).toBeCalled();

  // Run Components timers
  await act(async () => {
    vi.runAllTimers();
  });
});
