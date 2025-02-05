import { AxiosRequestConfig } from 'axios';
import { appAxios } from '../../axios';
import { IAuthUserDTO, ICreateAuthUserDTO } from '../../models';

export const URLS = {
  signIn: '/todos?signin',
  signUp: '/todos?signup',
  refreshToken: '/todos?refreshtoken',
};

export const signIn = (
  data: { userName: string; password: string },
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const response = appAxios
    .post<IAuthUserDTO>(URLS.signIn, data, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)
    // Remove this
    .then(
      () =>
        ({
          id: 1,
          name: 'Gustavo Vieira',
          userName: data.userName,
          email: 'gustavo.vieira@venturs.org.br',
          picture: 'https://picsum.photos/200',
          accessLevel: { id: 1, value: 'Director' },
          auth: {
            token: 'myToken',
            refreshToken: 'myRefreshToken',
          },
        } as IAuthUserDTO)
    );
  return {
    response,
    abort: () => aborter.abort(),
  };
};

export const signUp = (
  data: ICreateAuthUserDTO,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const response = appAxios
    .post<IAuthUserDTO>(URLS.signUp, data, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);
  return {
    response,
    abort: () => aborter.abort(),
  };
};

export const refreshToken = (axiosRequestConfig?: AxiosRequestConfig) => {
  const aborter = new AbortController();
  const response = appAxios
    .get<IAuthUserDTO>(URLS.refreshToken, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)
    .then(
      () =>
        ({
          id: 1,
          name: 'Gustavo Vieira',
          userName: 'vntguva',
          email: 'gustavo.vieira@venturs.org.br',
          picture: 'https://picsum.photos/200',
          accessLevel: { id: 1, value: 'Director' },
          auth: {
            token: 'myRefreshToken',
            refreshToken: 'myRefreshToken',
          },
        } as IAuthUserDTO)
    );
  return {
    response,
    abort: () => aborter.abort(),
  };
};
