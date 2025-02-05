import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../../hooks';

const AuthGuard: React.FC<{ component: React.ReactElement }> = ({
  component,
}) => {
  const redirect = () => <Navigate to="/signin" replace />;

  const { user } = useUserAuth();
  return user ? component : redirect();
};

export default AuthGuard;
