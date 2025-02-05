import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../../hooks';

const UnAuthGuard: React.FC<{ component: React.ReactElement }> = ({
  component,
}) => {
  const redirect = useCallback(() => <Navigate to="/users" replace />, []);
  const { user } = useUserAuth();
  return !user ? component : redirect();
};

export default UnAuthGuard;
