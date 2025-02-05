import { useUserAuth } from '../../../../hooks';
import {
  useAuthTokenInterceptor,
  useRefreshTokenInterceptor,
  useForbiddenInterceptor,
} from '../../hooks';

const AxiosInterceptorProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { signIn, signOut, user } = useUserAuth();

  // Requests interceptors
  useAuthTokenInterceptor(user?.auth.token);

  // Responses
  useRefreshTokenInterceptor(signIn);
  useForbiddenInterceptor(signOut);

  return <>{children}</>;
};

export default AxiosInterceptorProvider;
