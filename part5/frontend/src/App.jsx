import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useAuthenticationState, UserAuthenticationContext } from './hooks/useAuthentication';
import { useMemo } from 'react'


const App = () => {
  const { user, handleLogin, handleLogout } = useAuthenticationState();


  const contextValue = useMemo(() => ({
    user, 
    handleLogin, 
    handleLogout
  }), [user, handleLogin, handleLogout]);


  return (
    <UserAuthenticationContext.Provider value={ contextValue }>
      <div>
        <h2>blogs</h2>

        {user === null && (
          <LoginForm  />
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