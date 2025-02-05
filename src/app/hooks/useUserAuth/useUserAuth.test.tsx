import { act } from 'react-dom/test-utils';
import { render } from 'src/shared/utils/tests/test-utils';
import AppProviders from 'src/app/providers';
import useUserAuth from './useUserAuth';
/*
  Hook tests
*/

function setupHook() {
  const hook = {} as ReturnType<typeof useUserAuth>;
  // let hook: ReturnType<typeof useUserAuth> | undefined;
  function TestComponent() {
    Object.assign(hook, useUserAuth());
    return null;
  }
  const component = render(
    <AppProviders>
      <TestComponent />
    </AppProviders>
  );
  return {
    component,
    hook,
  };
}

test('Should start signed out and then sign in', () => {
  const { hook } = setupHook();
  expect(hook?.isSignedIn).toBeFalsy();

  act(() => {
    hook?.signIn({
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
  });

  expect(hook?.isSignedIn).toBeTruthy();
});
