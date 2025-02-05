import { useCallback, useContext, useEffect, useState } from 'react';
import { UserProviderContext } from 'src/app/providers/UserProvider/UserProvider';

const useUserAuth = () => {
  const { removeUser, setUser, user } = useContext(UserProviderContext);
  const [isSignedIn, setIsSignedIn] = useState(!!user);

  useEffect(() => {
    setIsSignedIn(!!user);
  }, [user]);

  const signOut = useCallback(removeUser, [removeUser]);

  const signIn = useCallback(setUser, [setUser]);

  return {
    isSignedIn,
    signOut,
    signIn,
    user,
  };
};

export default useUserAuth;
