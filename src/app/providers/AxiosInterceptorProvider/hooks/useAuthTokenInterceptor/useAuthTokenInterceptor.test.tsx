import { act } from 'react-dom/test-utils';
import { appAxios } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import MockAdapter from 'axios-mock-adapter';
import useAuthTokenInterceptor from './useAuthTokenInterceptor';

const mockAppAxios = new MockAdapter(appAxios);
mockAppAxios.onGet('/test').reply(200, {});

function setupHook(userToken?: string) {
  function TestComponent() {
    useAuthTokenInterceptor(userToken);
    return null;
  }
  const component = render(<TestComponent />);
  return {
    component,
  };
}

test('should Request with token', async () => {
  await act(async () => {
    setupHook('token');
  });

  const { appAxios } = await import('src/shared/api');
  const request = await appAxios.get('/test');
  expect(request.config.headers!.Authorization).toBe('token');
});

test('should Request with token', async () => {
  await act(async () => {
    setupHook();
  });

  const { appAxios } = await import('src/shared/api');
  const request = await appAxios.get('/test');
  expect(request.config.headers!.Authorization).toBeFalsy();
});
