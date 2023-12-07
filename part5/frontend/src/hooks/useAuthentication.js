import { useState, useEffect, createContext, useContext } from 'react';
import loginService from '../services/login'
import blogServices from '../services/blogs'
const { setToken } = blogServices

export const UserAuthenticationContext = createContext(null);

export const useAuthenticationState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      setToken(user.token)
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token)
    } catch (exception) {
      // Handle login error here if needed, or rethrow the exception
      throw exception;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser');
    setUser(null);
  };

  return { user, handleLogin, handleLogout };
};

export const useAuthenticationContext = () => useContext(UserAuthenticationContext);