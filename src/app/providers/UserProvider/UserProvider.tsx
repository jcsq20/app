import React, { useMemo, useState } from 'react';
import { APIModels } from 'src/shared/api';
import { AppLocalStorage } from 'src/shared/utils/appLocalStorage/appLocalStorage';

const localStoreUser = AppLocalStorage.getItem('APP:USER');

const initialState = localStoreUser;

interface IUserProviderContext {
  user?: APIModels.IAuthUserDTO;
  setUser: (user: APIModels.IAuthUserDTO) => unknown;
  removeUser: () => unknown;
}

const UserProviderContext = React.createContext(
  null
) as unknown as React.Context<IUserProviderContext>;

interface IUserProviderProps {
  user?: APIModels.IAuthUserDTO;
  children?: React.ReactNode;
}

const UserProvider: React.FC<IUserProviderProps> = ({
  user: initialUser = initialState,
  children,
}) => {
  const [localUser, setLocalUser] = useState(initialUser);

  const removeUser = () => {
    AppLocalStorage.removeItem('APP:USER');
    setLocalUser(undefined);
  };

  const setUser = (user: APIModels.IAuthUserDTO) => {
    AppLocalStorage.setItem('APP:USER', user);
    setLocalUser(user);
  };

  const providerValue = useMemo<IUserProviderContext>(
    () => ({
      user: localUser,
      setUser,
      removeUser,
    }),
    [localUser, setUser, removeUser]
  );

  return (
    <UserProviderContext.Provider value={providerValue}>
      {children}
    </UserProviderContext.Provider>
  );
};

export { UserProviderContext, UserProvider };
