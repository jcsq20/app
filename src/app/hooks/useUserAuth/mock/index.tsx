// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest';
import useUserAuth from '../useUserAuth';

/*
  Hook mock implementation for usage in components test
*/
type IUseUserAuthMock = ReturnType<typeof useUserAuth>;
export const useUserAuthMock = () => {
  const defaultUser = {
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
  };

  const defaultMock: IUseUserAuthMock = {
    signOut: vi.fn(),
    isSignedIn: true,
    signIn: vi.fn(),
    user: defaultUser,
  };

  return {
    implementation:
      (mock: Partial<IUseUserAuthMock> = defaultMock) =>
      (): IUseUserAuthMock => ({
        ...(mock as IUseUserAuthMock),
      }),
  };
};
