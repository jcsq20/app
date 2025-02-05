import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API, APIModels } from 'src/shared/api';

const USERS_QUERY_ROOT = 'users';

const UseUsersQuery = () => {
  const queryClient = useQueryClient();

  const onUpdateSuccess = (data: APIModels.IUserDTO) => {
    queryClient.setQueryData(
      [USERS_QUERY_ROOT, 'pages'],
      (prev: APIModels.IUserDTO[] | undefined) => {
        if (!prev) return prev;
        const index = prev.findIndex((user) => user.id === data.id);
        if (index >= 0) {
          prev[index] = data;
        }
        return prev;
      }
    );

    queryClient.setQueryData([USERS_QUERY_ROOT, data.id], () => ({
      ...data,
    }));
  };

  const list = (page: number) =>
    useQuery(
      [USERS_QUERY_ROOT, 'pages', page],
      ({ signal }) => API.Users.list({ signal }).response
    );

  const getById = (id: number) =>
    useQuery(
      [USERS_QUERY_ROOT, id],
      ({ signal }) => API.Users.getById(id, { signal }).response
    );

  const update = useMutation(
    ({ id, user }: { id: number; user: APIModels.ICreateUserDTO }) =>
      API.Users.update(id, user).response,
    {
      onSuccess: onUpdateSuccess,
    }
  );

  const create = useMutation(
    (user: APIModels.ICreateUserDTO) => API.Users.create(user).response,
    {
      onSuccess: () => queryClient.resetQueries([USERS_QUERY_ROOT, 'pages']),
    }
  );

  const remove = useMutation(
    (id: APIModels.IUserDTO['id']) => API.Users.remove(id).response,
    {
      onSuccess: (_data, id: number) => {
        queryClient.resetQueries([USERS_QUERY_ROOT, 'pages']);
        queryClient.resetQueries([USERS_QUERY_ROOT, id]);
      },
    }
  );

  return {
    list,
    getById,
    update,
    create,
    remove,
  };
};

export default UseUsersQuery;
