import { Progress } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserAuth } from '../hooks';
import AuthGuard from './guards/AuthGuard/AuthGuard';
import UnAuthGuard from './guards/UnAuthGuard/UnAuthGuard';

const LazyAuthModule = React.lazy(
  () => import('../../modules/AuthModule/AuthModule')
);
const LazyUsersModule = React.lazy(
  () => import('../../modules/UsersModule/UsersModule')
);

const AppRouter: React.FC = () => {
  const { signIn, isSignedIn } = useUserAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isSignedIn ? 'users' : 'signin'} replace />}
      />

      <Route
        path="signin"
        element={
          <UnAuthGuard
            component={
              <Suspense
                fallback={
                  <Progress
                    size="xs"
                    data-name="cesto"
                    isIndeterminate
                    colorScheme="secondary"
                  />
                }
              >
                <LazyAuthModule onSignIn={signIn} />
              </Suspense>
            }
          />
        }
      />

      <Route
        path="users/*"
        element={
          <AuthGuard
            component={
              <Suspense
                fallback={
                  <Progress size="xs" isIndeterminate colorScheme="secondary" />
                }
              >
                <LazyUsersModule />
              </Suspense>
            }
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
