import { AxiosRequestConfig } from 'axios';
import { appAxios } from '../../axios';
import { ITagDTO } from '../../models';

export const URLS = {
  list: '/todos?tag',
};

export const FAKE_DATA: ITagDTO[] = [
  {
    id: 1,
    value: 'Patamon',
  },
  {
    id: 2,
    value: 'Angemon',
  },
  {
    id: 3,
    value: 'MagnaAngemon',
  },
  {
    id: 4,
    value: 'Seraphimon',
  },
];

export const list = (axiosRequestConfig?: AxiosRequestConfig) => {
  const aborter = new AbortController();
  const response = appAxios
    .get<ITagDTO[]>(URLS.list, {
      ...axiosRequestConfig,
      signal: axiosRequestConfig?.signal || aborter.signal,
    })
    .then((response) => response.data)
    .then(() => FAKE_DATA);

  return {
    response,
    abort: () => aborter.abort(),
  };
};
