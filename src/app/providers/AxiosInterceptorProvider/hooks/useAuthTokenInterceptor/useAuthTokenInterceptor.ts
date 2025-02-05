import { AxiosRequestConfig } from 'axios';
import { useCallback, useLayoutEffect } from 'react';
import { appAxios } from 'src/shared/api';

const useAuthTokenInterceptor = (userToken?: string) => {
  const interceptor = useCallback(
    (config: AxiosRequestConfig) => {
      if (userToken) {
        config.headers!.Authorization = userToken;
      } else {
        delete config.headers!.Authorization;
      }
      return config;
    },
    [userToken],
  );

  useLayoutEffect(() => {
    const token = appAxios.interceptors.request.use(interceptor as any);
    const unsubscribe = () => {
      appAxios.interceptors.request.eject(token);
    };
    return unsubscribe;
  }, [interceptor]);
};

export default useAuthTokenInterceptor;
