import { AxiosInterceptorProvider } from './AxiosInterceptorProvider';
import { UserProvider } from './UserProvider/UserProvider';

export * from './AxiosInterceptorProvider';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  //* Redux state for the app */
  <UserProvider>
    {/* // Axios request and response interceptors */}
    <AxiosInterceptorProvider>
      {/* Global menu */}
      {children}
    </AxiosInterceptorProvider>
  </UserProvider>
);

export default AppProviders;
