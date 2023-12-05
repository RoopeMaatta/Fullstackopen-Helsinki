import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useUserAuthentication, UserAuthenticationContext } from './hooks/useUserAuthentication';



const App = () => {
  const { user, handleLogin, handleLogout } = useUserAuthentication();

  return (
    <UserAuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
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