import { act } from 'react-dom/test-utils';
import { API, appAxios } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { vi } from 'vitest';
import useRefreshTokenInterceptor from './useRefreshTokenInterceptor';

const mockAxios = new MockAdapter(axios);
const mockAppAxios = new MockAdapter(appAxios);

function setupHook(callBackFn?: () => unknown) {
  function TestComponent() {
    useRefreshTokenInterceptor(callBackFn);
    return null;
  }
  const component = render(<TestComponent />);
  return {
    component,
  };
}

beforeEach(() => {
  mockAppAxios.reset();
  mockAxios.reset();
});

test('hook should be set into component', async () => {
  let component;

  await act(async () => {
    const { component: $component } = setupHook();
    component = $component;
  });
  expect(component).toBeTruthy();
});

test('should retry request if expired', async () => {
  const fnCallBack = vi.fn();
  appAxios.defaults.headers.common = {
    ...appAxios.defaults.headers.common,
    Authorization: 'someToken',
  };
  mockAppAxios.onPost('/postTest').reply(403, {});
  mockAppAxios
    .onGet(API.Auth.URLS.refreshToken)
    .reply(200, { user: { auth: { token: 'newToken' } } });

  const responseData = { data: 'ok' };

  mockAxios.onPost('/postTest').reply(200, responseData);

  await act(async () => {
    setupHook(fnCallBack);
  });
  await act(async () => {
    const response = await appAxios.post(
      '/postTest',
      { data: 'someData' },
      { headers: { Authorization: 'someToken' } }
    );
    expect(response.data).toEqual(responseData);
  });

  expect(fnCallBack).toBeCalled();
});

test('should fail the refresh token request', async () => {
  const fnCallBack = vi.fn();
  appAxios.defaults.headers.common = {
    ...appAxios.defaults.headers.common,
    Authorization: 'someToken',
  };

  await act(async () => {
    setupHook(fnCallBack);
  });
  await act(async () => {
    try {
      await appAxios.post(
        '/postTest',
        { data: 'someData' },
        { headers: { Authorization: 'someToken' } }
      );
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  expect(fnCallBack).not.toBeCalled();
});

test('should fail the second request attempt', async () => {
  appAxios.defaults.headers.common = {
    ...appAxios.defaults.headers.common,
    Authorization: 'someToken',
  };
  mockAppAxios.onPost('/postTest').reply(403, {});
  mockAppAxios
    .onGet(API.Auth.URLS.refreshToken)
    .reply(200, { user: { auth: { token: 'newToken' } } });

  mockAxios.onPost('/postTest').reply(400);

  await act(async () => {
    setupHook();
  });
  await act(async () => {
    try {
      await appAxios.post(
        '/postTest',
        { data: 'someData' },
        { headers: { Authorization: 'someToken' } }
      );
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
