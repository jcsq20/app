import { act, fireEvent, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API, appAxios, APIModels } from 'src/shared/api';
import { render } from 'src/shared/utils/tests/test-utils';
import * as ReactRouterDom from 'react-router-dom';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { vi } from 'vitest';
import UserView from './UserView';

const user = {
  id: 1,
  name: 'Gustavo Vieira',
  userName: 'vntguva',
  email: 'gustavo.vieira@venturs.org.br',
  picture: 'https://picsum.photos/200',
  accessLevel: { id: 1, value: 'Contributor' },
  tags: [{ id: 1, value: 'Patamon' }],
  birthday: new Date().toISOString(),
};

const appAxiosMock = new MockAdapter(appAxios);

vi.mock('react-router-dom', async () => {
  const existing = await (vi.importActual('react-router-dom') as any);
  return {
    ...existing,
    useNavigate: vi.fn(),
  };
});

beforeEach(() => {
  appAxiosMock.reset();
  appAxiosMock
    .onGet(API.AccessLevel.URLS.list)
    .reply(200, [{ id: 1, value: 'director' }] as APIModels.IAccessLevelDTO[]);
  appAxiosMock
    .onGet(API.Tags.URLS.list)
    .reply(200, [{ id: 1, value: 'Patamon' }] as APIModels.ITagDTO[]);
  appAxiosMock.onPut(API.Users.URLS.update(1)).reply(200, { ...user });
  appAxiosMock.onPost(API.Users.URLS.create).reply(200, { ...user });
});

test('Render UsersView', async () => {
  await act(async () => {
    render(<UserView />);
  });
});

test('Should return to /users', async () => {
  const mockFn = vi.fn();
  vi.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockFn);
  await act(async () => {
    render(<UserView />);
  });

  const btn = screen.getByTestId('@backButton');
  await act(async () => {
    btn.click();
  });

  expect(mockFn).toBeCalledWith('/users');
});

test('Should submit to /update user', async () => {
  await act(async () => {
    render(<UserView user={user} />);
  });

  const btn = screen.getByTestId('@submitBtn');
  await act(async () => {
    btn.click();
  });

  expect(appAxiosMock.history.put[0].url).toBe(API.Users.URLS.update(1));
});

test('Should submit to /update user and update react query cache', async () => {
  let queryClient: QueryClient;

  const Wrapper = () => {
    queryClient = useQueryClient();
    queryClient.setQueryData(['users'], () => [user]);
    return (
      <>
        <UserView user={user} />
      </>
    );
  };

  await act(async () => {
    render(<Wrapper />);
  });

  const btn = screen.getByTestId('@submitBtn');
  await act(async () => {
    btn.click();
  });

  const data = queryClient!.getQueryData(['users']) as any[];

  expect(data.length > 0).toBe(true);
  // Cleaning cache
  queryClient!.setQueryData(['users'], () => null);
});

test('Should submit to /update user and update react query cache when there is no user', async () => {
  let queryClient: QueryClient;

  const Wrapper = () => {
    queryClient = useQueryClient();
    queryClient.setQueryData(['users'], () => []);
    return (
      <>
        <UserView user={user} />
      </>
    );
  };

  await act(async () => {
    render(<Wrapper />);
  });

  const btn = screen.getByTestId('@submitBtn');
  await act(async () => {
    btn.click();
  });

  const data = queryClient!.getQueryData(['users']) as any[];

  expect(data.length > 0).toBe(false);
  // Cleaning cache
  queryClient!.setQueryData(['users'], () => null);
});

test('Should not submit to /create user', async () => {
  await act(async () => {
    render(<UserView />);
  });

  const btn = screen.getByTestId('@submitBtn');
  await act(async () => {
    btn.click();
  });

  expect(appAxiosMock.history.post).toEqual([]);
});

test('Should submit to /create user', async () => {
  await act(async () => {
    render(<UserView />);
  });

  await act(async () => {
    const inputName = screen.getByTestId('@inputName');
    const inputUsername = screen.getByTestId('@inputUsername');
    const inputEmail = screen.getByTestId('@inputEmail');
    const inputAccesslevel = screen.getByTestId('@inputAccesslevel-1');
    const birthday = screen.getByTestId('@inputBirthday');

    fireEvent.change(inputName, { target: { value: 'myName' } });
    fireEvent.change(inputUsername, { target: { value: 'myUsername' } });
    fireEvent.change(inputEmail, { target: { value: 'myEmail@email.com' } });
    fireEvent.change(birthday, { target: { valueAsDate: new Date() } });

    fireEvent.click(inputAccesslevel);
  });

  const tagSelectFormControl = screen.getByTestId('@tagSelectFormControl');
  const selectComponent = tagSelectFormControl.querySelector('#tags')!;
  const input = selectComponent.querySelector('input');
  await act(async () => {
    fireEvent.focus(input!);
    fireEvent.keyDown(input!, { key: 'ArrowDown', code: 40 });
  });

  await act(async () => {
    const option = screen.getByText('Patamon');
    fireEvent.click(option);
  });

  const btn = screen.getByTestId('@submitBtn');
  await act(async () => {
    btn.click();
  });

  expect(appAxiosMock.history.post[0].url).toBe(API.Users.URLS.create);
});

// test('Should submit to /create user and to react query cache', async () => {
//   let queryClient: QueryClient;

//   const Wrapper = () => {
//     queryClient = useQueryClient();
//     queryClient.setQueryData(['users'], () => []);
//     return (
//       <>
//         <UserView />
//       </>
//     );
//   };

//   await act(async () => {
//     render(<Wrapper />);
//   });

//   await act(async () => {
//     const inputName = screen.getByTestId('@inputName');
//     const inputUsername = screen.getByTestId('@inputUsername');
//     const inputEmail = screen.getByTestId('@inputEmail');
//     const inputAccesslevel = screen.getByTestId('@inputAccesslevel-1');
//     const birthday = screen.getByTestId('@inputBirthday');

//     fireEvent.change(inputName, { target: { value: 'myName' } });
//     fireEvent.change(inputUsername, { target: { value: 'myUsername' } });
//     fireEvent.change(inputEmail, { target: { value: 'myEmail@email.com' } });
//     fireEvent.change(birthday, { target: { valueAsDate: new Date() } });

//     fireEvent.click(inputAccesslevel);
//   });

//   const tagSelectFormControl = screen.getByTestId('@tagSelectFormControl');
//   const selectComponent = tagSelectFormControl.querySelector('#tags')!;
//   const input = selectComponent.querySelector('input');
//   await act(async () => {
//     fireEvent.focus(input!);
//     fireEvent.keyDown(input!, { key: 'ArrowDown', code: 40 });
//   });

//   await act(async () => {
//     const option = screen.getByText('Patamon');
//     fireEvent.click(option);
//   });

//   const btn = screen.getByTestId('@submitBtn');
//   await act(async () => {
//     btn.click();
//   });

//   const data = queryClient!.getQueryData(['users']) as any[];

//   expect(data.length > 0).toBe(true);
// });

test('Should handle image change', async () => {
  global.URL.createObjectURL = vi.fn();

  await act(async () => {
    render(
      <UserView
        user={{
          id: 0,
          name: '',
          userName: '',
          email: '',
          accessLevel: {
            id: 1,
            value: 'Director',
          },
          picture: 'http://some.com',
          tags: [{ id: 1, value: 'Patamon' }],
          birthday: new Date().toISOString(),
        }}
      />
    );
  });

  // The remove buttons should not be seeing
  const removeBtn = screen.getAllByTestId('@removeImgBtn')[0];
  await act(async () => {
    removeBtn.click();
  });

  const buttons = screen.queryAllByTestId('@removeImgBtn');

  expect(buttons).toEqual([]);
});
