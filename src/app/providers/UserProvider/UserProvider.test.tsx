import { screen } from '@testing-library/react';
import { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { AppLocalStorage } from 'src/shared/utils/appLocalStorage/appLocalStorage';
import { render } from 'src/shared/utils/tests/test-utils';
import { UserProvider, UserProviderContext } from './UserProvider';

const TestComponent = () => {
  const { removeUser, setUser } = useContext(UserProviderContext);
  return (
    <>
      <button
        aria-label="test"
        type="button"
        data-testid="@singout"
        onClick={removeUser}
      />
      <button
        aria-label="test"
        type="button"
        data-testid="@singign"
        onClick={() => setUser({ userName: 'test' } as unknown as any)}
      />
    </>
  );
};

test('should render the component', async () => {
  let component;

  await act(async () => {
    component = render(<UserProvider />);
  });

  expect(component).toBeTruthy();
});

test('should set user then remove user', async () => {
  await act(async () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
  });

  await act(async () => {
    screen.getByTestId('@singign').click();
  });

  const singedUser = AppLocalStorage.getItem('APP:USER');

  expect(singedUser).toBeTruthy();

  await act(async () => {
    screen.getByTestId('@singout').click();
  });

  const user = AppLocalStorage.getItem('APP:USER');

  expect(user).toBeFalsy();
});
