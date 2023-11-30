import { useState, useEffect, createContext, useContext } from 'react';

export const UserAuthenticationContext = createContext(null);

export const useUserAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser');
    setUser(null);
  };

  return { user, handleLogin, handleLogout };
};

export const useUserAuthenticationContext = () => useContext(UserAuthenticationContext);