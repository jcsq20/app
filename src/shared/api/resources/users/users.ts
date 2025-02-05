import { AxiosRequestConfig } from 'axios';
import { appAxios } from '../../axios';
import { ICreateUserDTO, IUserDTO } from '../../models';
import { FAKE_DATA as AccessLevelFakeData } from '../accessLevel/accesslevel';
import { FAKE_DATA as TagsFakeData } from '../tags/tags';

export const URLS = {
  list: '/todos?users',
  getById: (id: number) => `/todos/${id}?users`,
  create: '/todos?users',
  update: (id: number) => `/todos/${id}?users`,
  remove: (id: number) => `/todos/${id}?users`,
};

export const FAKE_DATA: Omit<IUserDTO, 'id'>[] = [
  {
    name: 'Gustavo Vieira',
    userName: 'vntguva',
    email: 'gustavo.vieira@venturs.org.br',
    picture: 'https://picsum.photos/200',
    accessLevel: { id: 3, value: 'Contributor' },
    tags: [{ id: 1, value: 'Patamon' }],
    birthday: new Date('1989-5-23').toISOString(),
  },
  {
    name: 'Kleber Nardi',
    userName: 'rubinho',
    email: 'kleber.nardi@venturus.org',
    accessLevel: {
      id: 1,
      value: 'Director',
    },
    picture: 'https://picsum.photos/200',
    tags: [{ id: 2, value: 'Angemon' }],
    birthday: new Date('1960-7-20').toISOString(),
  },
  {
    name: 'João Maia',
    userName: 'johnMay',
    email: 'joao.maia@venturus.org',
    accessLevel: {
      id: 1,
      value: 'Director',
    },
    picture: 'https://picsum.photos/200',
    tags: [],
    birthday: new Date('1950-7-2').toISOString(),
  },
];

export const list = (axiosRequestConfig?: AxiosRequestConfig) => {
  const aborter = new AbortController();
  const response = appAxios
    .get<IUserDTO[]>(URLS.list, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)

    // Remove this
    .then(() => FAKE_DATA.map((e, index) => ({ ...e, id: index + 1 })));
  return {
    response,
    abort: () => aborter.abort(),
  };
};

export const getById = (
  id: IUserDTO['id'],
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const response = appAxios
    .get<IUserDTO>(URLS.getById(id), {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)

    // Remove this
    .then(() => {
      const user = FAKE_DATA.find((_e, index) => index + 1 === id);
      if (user) {
        return { ...user, id };
      }
      return Promise.reject(Error('404'));
    });

  return {
    response,
    abort: () => aborter.abort(),
  };
};

export const create = (
  data: ICreateUserDTO,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'picture') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });
  const response = appAxios
    .post<ICreateUserDTO>(URLS.create, formData, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)

    // Remove this
    .then(() => {
      const user = {
        ...data,
        id: new Date().getTime(),
        accessLevel: {
          id: data.accessLevel,
          value:
            AccessLevelFakeData.find((e) => e.id === data.accessLevel)?.value ||
            '',
        },
        tags: data.tags.map(
          (tagId) => TagsFakeData.find(({ id }) => id === tagId)!
        ),
      };
      FAKE_DATA.push(user);
      return user;
    });

  return {
    response,
    abort: () => aborter.abort(),
  };
};

export const update = (
  id: IUserDTO['id'],
  data: ICreateUserDTO,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'picture') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });
  const response = appAxios
    .put<ICreateUserDTO>(URLS.update(id), formData, {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data)

    // Remove this
    .then(() => {
      const user = FAKE_DATA.find((_e, index) => index + 1 === id);
      if (user) {
        FAKE_DATA[id - 1] = {
          ...data,
          accessLevel: {
            id: data.accessLevel,
            value: AccessLevelFakeData.find(
              ({ id }) => id === data.accessLevel
            )!.value,
          },
          tags: data.tags.map(
            (tagId) => TagsFakeData.find(({ id }) => id === tagId)!
          ),
        };
        return { ...FAKE_DATA[id - 1], id };
      }
      return Promise.reject(Error('404'));
    });

  return {
    response,
    aborter: () => aborter.abort(),
  };
};

export const remove = (
  id: IUserDTO['id'],
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const aborter = new AbortController();
  const response = appAxios
    .delete<never>(URLS.remove(id), {
      signal: aborter.signal,
      ...axiosRequestConfig,
    })
    // Remove this
    .then(() => {
      const userIndex = FAKE_DATA.findIndex((_e, index) => index + 1 === id);
      if (userIndex > 0) {
        FAKE_DATA.splice(userIndex, 1);
        return Promise.resolve();
      }
      return Promise.reject(Error('404'));
    });

  return {
    response,
    abort: () => aborter.abort(),
  };
};
