
// App.jsx:
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useAuthenticationState, UserAuthenticationContext } from './hooks/useAuthenticationState';
import { useMemo } from 'react'



const App = () => {
  const { user, handleLogin, handleLogout } = useAuthenticationState();

  const contextValue = useMemo(() => ({
    user, 
    handleLogin, 
    handleLogout
  }), [user, handleLogin, handleLogout]);

  return (
    <UserAuthenticationContext.Provider value={contextValue}>
      <div>
        <h2>blogs</h2>

        {user === null && (
          <LoginForm />
        )}
        
        {user !== null && (
          <>
            <div>
              {user.name} is logged in
              <button onClick={handleLogout}>Logout</button>  
            </div>
            <br />
            
            <NewBlogForm />
            <br />

            <BlogList />
          </>
        )}

      </div>
    </UserAuthenticationContext.Provider>
  );
};

export default App

// useAuthenticationState:
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////


import { useState, useEffect, createContext, useContext } from 'react';
import loginService from '../services/login'

export const UserAuthenticationContext = createContext(null);

export const useAuthenticationState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      setUser(user);
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




// Loginform:
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////

import { useState } from 'react'
import InputField from './InputField'
import { useAuthenticationState } from '../hooks/useAuthenticationState';


const LoginForm = () => {
  const { handleLogin } = useAuthenticationState();

const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [errorMessage, setErrorMessage] = useState(null)


const handleSubmit = async (event) => {
  event.preventDefault()
  
  try {
    await handleLogin(username, password)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}


  return (
    
    <form onSubmit={handleSubmit}>
    <div>
    {errorMessage}
    </div>
    
    <InputField
        label="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />

      <InputField
        label="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

    <button type="submit">login</button>
  </form>
  )
}

  export default LoginForm
