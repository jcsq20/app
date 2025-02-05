import { act, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API, appAxios } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import * as ReactRouterDom from 'react-router-dom';
import { vi } from 'vitest';
import UsersView from './UsersView';

const user = {
  id: 1,
  name: 'Test',
  userName: 'vntguva',
  email: 'gustavo.vieira@venturs.org.br',
  picture: 'https://picsum.photos/200',
  accessLevel: { id: 1, value: 'Contributor' },
};

vi.mock('react-router-dom', async () => {
  const existing = await (vi.importActual('react-router-dom') as any);
  return {
    ...existing,
    useNavigate: vi.fn(),
  };
});

const appAxiosMock = new MockAdapter(appAxios);

beforeEach(() => {
  appAxiosMock.reset();
  appAxiosMock.onGet(API.Users.URLS.list).reply(200, [user]);
});

test('should render component', async () => {
  let component: any;
  await act(async () => {
    component = render(<UsersView />);
  });
  expect(component).toBeTruthy();
});

test('should navigate to new', async () => {
  const mockFn = vi.fn();
  vi.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockFn);

  await act(async () => {
    render(<UsersView />);
  });

  const btn = screen.getByTestId('@newUserBtn');
  await act(async () => {
    btn.click();
  });
  expect(mockFn).toBeCalledWith('new');
});

test('should navigate to user', async () => {
  const mockFn = vi.fn();
  vi.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockFn);

  await act(async () => {
    render(<UsersView />);
  });

  const btn = screen.queryAllByTestId('@editUserBtn')[0];
  await act(async () => {
    btn.click();
  });

  expect(mockFn).toBeCalled();
});
