import { AxiosRequestConfig } from 'axios';
import { appAxios } from '../../axios';
import { IAccessLevelDTO } from '../../models';

export const URLS = {
  list: '/todos?accesslevel',
};

export const FAKE_DATA: IAccessLevelDTO[] = [
  {
    id: 1,
    value: 'Director',
  },
  {
    id: 2,
    value: 'Manager',
  },
  {
    id: 3,
    value: 'Contributor',
  },
];

export const list = (axiosRequestConfig?: AxiosRequestConfig) => {
  const aborter = new AbortController();
  const response = appAxios
    .get<IAccessLevelDTO[]>(URLS.list, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)
    .then(() => FAKE_DATA);

  return {
    response,
    abort: () => aborter.abort(),
  };
};
