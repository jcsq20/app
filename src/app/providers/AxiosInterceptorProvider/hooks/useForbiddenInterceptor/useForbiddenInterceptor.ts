import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { appAxios } from 'src/shared/api';

const useForbiddenInterceptor = (
  onForbidden: () => unknown = () => undefined
) => {
  const errorInterceptor = useCallback(
    (error: AxiosError) => {
      if (error.response?.status === 403) {
        onForbidden();
      }
      return Promise.reject(error);
    },
    [onForbidden]
  );

  useEffect(() => {
    const token = appAxios.interceptors.response.use(
      undefined,
      errorInterceptor
    );
    const unsubscribe = () => appAxios.interceptors.response.eject(token);
    return unsubscribe;
  }, [errorInterceptor]);
};

export default useForbiddenInterceptor;
