import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useAuthenticationState, UserAuthenticationContext } from './hooks/useAuthentication'
import { useMemo, useState } from 'react'


const App = () => {
  const { user, handleLogin, handleLogout } = useAuthenticationState()

  const [notification, setNotification] = useState({ message: null, type: null })
  const [blogUpdate, setBlogUpdate] = useState(false)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000) // Reset after 5 seconds
  }

  const contextValue = useMemo(() => ({
    user,
    handleLogin,
    handleLogout,
    blogUpdate,
    setBlogUpdate,
    showNotification
  }), [user, handleLogin, handleLogout, blogUpdate])


  return (
    <UserAuthenticationContext.Provider value={ contextValue }>
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type} />

        {user === null && (
          <LoginForm  /> // context: handleLogin, showNotifivation
        )}

        {user !== null && (
          <>
            <div>
              {user.name} is logged in
              <button onClick={handleLogout}>Logout</button>
            </div>
            <br />
            <Togglable buttonLabel="Create new blog">
              <NewBlogForm />
            </Togglable>
            <br />

            <BlogList />
          </>
        )}

      </div>
    </UserAuthenticationContext.Provider>
  )
}

export default App