import axios, { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { API, appAxios, APIModels } from 'src/shared/api';

const useRefreshTokenInterceptor = (
  onTokenRefresh: (user: APIModels.IAuthUserDTO) => unknown = () => undefined,
) => {
  const errorInterceptor = useCallback(
    async (error: AxiosError) => {
      if (
        // If error is on the refreshtoken, or signup or signin, return the error
        error.response?.status !== 403 ||
        error.config!.url === API.Auth.URLS.refreshToken ||
        error.config!.url === API.Auth.URLS.signIn ||
        error.config!.url === API.Auth.URLS.signUp
      ) {
        return Promise.reject(error);
      }

      // Refresh token retry
      return API.Auth.refreshToken()
        .response.then((user) => {
          // Do something with the new token
          onTokenRefresh(user);
          // Redo the request
          const originalRequestConfig = error.config;
          originalRequestConfig!.headers!.Authorization = user.auth.token;

          return axios
            .request(originalRequestConfig!)
            .catch((e) => Promise.reject(e));
        })
        .catch((error) => Promise.reject(error));
    },
    [onTokenRefresh],
  );

  useEffect(() => {
    const token = appAxios.interceptors.response.use(
      undefined,
      errorInterceptor,
    );
    const unsubscribe = () => appAxios.interceptors.response.eject(token);
    return unsubscribe;
  }, [errorInterceptor]);
};

export default useRefreshTokenInterceptor;
