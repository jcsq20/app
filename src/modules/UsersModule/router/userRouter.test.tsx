import { render } from 'src/shared/utils/tests/test-utils';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API, appAxios, APIModels } from 'src/shared/api';
import { vi } from 'vitest';
import UsersRouter from './UsersRouter';

const user = {
  id: 1,
  name: 'Gustavo Vieira',
  userName: 'vntguva',
  email: 'gustavo.vieira@venturs.org.br',
  picture: 'https://picsum.photos/200',
  accessLevel: { id: 3, value: 'Contributor' },
};

vi.useFakeTimers();

beforeEach(() => {
  const AppAxiosMock = new MockAdapter(appAxios);
  AppAxiosMock.onGet(API.Users.URLS.list).reply(200, [user]);
  AppAxiosMock.onGet(API.Users.URLS.getById(1)).reply(200, user);
  AppAxiosMock.onGet(API.AccessLevel.URLS.list).reply(200, [
    { id: 1, value: 'Director' },
  ] as APIModels.IAccessLevelDTO[]);
  AppAxiosMock.onGet(API.Tags.URLS.list).reply(200, [
    { id: 1, value: 'Tag' },
  ] as APIModels.ITagDTO[]);
});

test('Should Navigate to users', async () => {
  await act(async () => {
    render(<UsersRouter />);
  });

  const view = screen.getByTestId('@usersView');
  expect(view).toBeTruthy();
});

test('Should Navigate to users', async () => {
  window.history.pushState({}, '', '/1');

  await act(async () => {
    render(<UsersRouter />);
  });

  await act(async () => {
    vi.runAllTimers();
  });

  const view = screen.getByTestId('@userViewLoading');
  expect(view).toBeTruthy();
});

test('Should Navigate to new', async () => {
  window.history.pushState({}, '', '/new');

  await act(async () => {
    render(<UsersRouter />);
  });

  const view = screen.getByTestId('@userView');
  expect(view).toBeTruthy();
});
