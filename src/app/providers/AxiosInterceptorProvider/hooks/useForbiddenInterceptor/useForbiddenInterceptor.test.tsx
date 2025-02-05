import { act } from 'react-dom/test-utils';
import { appAxios } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import useForbiddenInterceptor from './useForbiddenInterceptor';

const mockAppAxios = new MockAdapter(appAxios);
const callBackFn = vi.fn();

function setupHook(callBackFn?: () => unknown) {
  function TestComponent() {
    useForbiddenInterceptor(callBackFn);
    return null;
  }
  const component = render(<TestComponent />);
  return {
    component,
  };
}

beforeEach(() => {
  mockAppAxios.reset();
  callBackFn.mockClear();
});

test('hook should be set into component', async () => {
  let component;
  mockAppAxios.onGet('/test').reply(403, {});

  await act(async () => {
    const { component: $component } = setupHook();
    component = $component;
  });

  const { appAxios } = await import('src/shared/api');
  try {
    await appAxios.get('/test');
  } catch (e) {
    expect(component).toBeTruthy();
  }
});

test('should call func on 403', async () => {
  mockAppAxios.onGet('/test').reply(403, {});

  await act(async () => {
    setupHook(callBackFn);
  });

  const { appAxios } = await import('src/shared/api');
  try {
    await appAxios.get('/test');
  } catch (e) {
    expect(callBackFn).toBeCalled();
  }
});

test('should not call callback', async () => {
  mockAppAxios.onGet('/test').reply(400, {});

  await act(async () => {
    setupHook(callBackFn);
  });

  const { appAxios } = await import('src/shared/api');
  try {
    await appAxios.get('/test');
  } catch (e) {
    expect(callBackFn).not.toBeCalled();
  }
});
