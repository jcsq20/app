import { act, fireEvent, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API, appAxios } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import SignInView from './SignInView';

const appAxiosMock = new MockAdapter(appAxios);

beforeEach(() => {
  appAxiosMock.reset();
});

test('Render SigninView', async () => {
  const component = render(<SignInView />);
  expect(component).toBeTruthy();
});

test('Should not allow to submit and display error messages', async () => {
  appAxiosMock.onPost(API.Auth.URLS.signIn).reply(200, {});

  await act(async () => {
    render(<SignInView />);
  });

  await act(async () => {
    const button = screen.getByTestId('@submitBtn') as HTMLButtonElement;
    button.click();
  });

  const usernameError = screen.getByTestId('@usernameError') as HTMLDivElement;
  const passwordError = screen.getByTestId('@passwordError') as HTMLDivElement;
  expect(usernameError).toBeTruthy();
  expect(passwordError).toBeTruthy();
  expect(appAxiosMock.history.get).toEqual([]);
});

test('Should allow to signin', async () => {
  appAxiosMock.onPost(API.Auth.URLS.signIn).reply(200, {
    name: 'Test',
    userName: 'Test',
    id: 1,
    accessLevel: { id: 1, value: 'Test' },
    picture: '',
    email: 'test@test.com',
    auth: {
      token: 'Token',
      refreshToken: 'Refresh',
    },
  });

  act(() => {
    render(<SignInView />);
  });

  await act(async () => {
    const usernameInput = screen.getByTestId('@usernameInput');
    const passInput = screen.getByTestId('@passwordInput');

    fireEvent.change(passInput, { target: { value: 'password' } });
    fireEvent.change(usernameInput, { target: { value: 'username' } });
  });

  await act(async () => {
    const button = screen.getByTestId('@submitBtn');
    button.click();
  });
  expect(appAxiosMock.history.post.length).toEqual(1);
});

test('Should view password', async () => {
  await act(async () => {
    render(<SignInView />);
  });

  const passInput = screen.getByTestId('@passwordInput') as HTMLInputElement;
  expect(passInput.type).toBe('password');

  await act(async () => {
    const button = screen.getByTestId('@showPass');
    button.click();
  });
  expect(passInput.type).toBe('text');
});
