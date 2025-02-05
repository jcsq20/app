import { act, screen } from '@testing-library/react';
import { render } from 'src/shared/utils/tests/test-utils';
import { vi } from 'vitest';
import UsersTable from './UsersTable';

const user = {
  id: 1,
  name: 'Test',
  userName: 'vntguva',
  email: 'gustavo.vieira@venturs.org.br',
  picture: 'https://picsum.photos/200',
  accessLevel: { id: 1, value: 'Contributor' },
  tags: [{ id: 1, value: 'Patamon' }],
  birthday: new Date().toISOString(),
};

test('should render component without users', async () => {
  let component: any;
  await act(async () => {
    component = render(<UsersTable />);
  });
  expect(component).toBeTruthy();
});

test('should render component with users', async () => {
  let component: any;
  await act(async () => {
    component = render(<UsersTable users={[user]} />);
  });
  expect(component).toBeTruthy();
});

test('should open modal on delete and close', async () => {
  await act(async () => {
    render(<UsersTable users={[user]} />);
  });

  const btn = screen.getByTestId('@deleteUserBtn');
  await act(async () => {
    btn.click();
  });

  const deleteModal = screen.getByTestId('@deleteUserModal');
  expect(deleteModal).toBeTruthy();

  const btnClose = screen.getByTestId('@deleteUserModalNo');
  await act(async () => {
    btnClose.click();
  });

  const deleteModalStillOpen = screen.queryByTestId('@deleteUserModal');
  expect(deleteModalStillOpen).toBeFalsy();
});

test('should trigger user edit default fnc', async () => {
  await act(async () => {
    render(<UsersTable users={[user]} />);
  });

  const btn = screen.getByTestId('@editUserBtn');

  await act(async () => {
    btn.click();
  });
});

test('should trigger user edit fn callback', async () => {
  const fn = vi.fn();
  await act(async () => {
    render(<UsersTable users={[user]} onUserEditClick={fn} />);
  });

  const btn = screen.getByTestId('@editUserBtn');

  await act(async () => {
    btn.click();
  });

  expect(fn).toBeCalled();
});

test('should call user to delete fn', async () => {
  const fn = vi.fn();

  await act(async () => {
    render(<UsersTable users={[user]} onUserDelete={fn} />);
  });

  const btnOpenModal = screen.getByTestId('@deleteUserBtn');
  await act(async () => {
    btnOpenModal.click();
  });

  const btn = screen.getByTestId('@deleteUserModalYes');

  await act(async () => {
    btn.click();
  });

  expect(fn).toBeCalled();
});
