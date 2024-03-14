import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useAuthenticationState, UserAuthenticationContext } from './hooks/useAuthentication'
import { useMemo, useState } from 'react'
import { useNotificationContext } from './NotificationContext'

const App = () => {
  const { user, handleLogin, handleLogout } = useAuthenticationState()

  const [blogUpdate, setBlogUpdate] = useState(false)

  const { notification } = useNotificationContext()

  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
      blogUpdate,
      setBlogUpdate,
    }),
    [user, handleLogin, handleLogout, blogUpdate]
  )

  return (
    <UserAuthenticationContext.Provider value={contextValue}>
      <div>
        <h2>Blogs</h2>
        <Notification message={notification.message} type={notification.type} />

        {user === null && (
          <LoginForm /> // context: handleLogin, showNotifivation
        )}

        {user !== null && (
          <>
            <div>
              {user.name} is logged in
              <button onClick={handleLogout}>Logout</button>
            </div>
            <br />
            <NewBlogForm /> {/* context: setBlogUpdate, showNotification */}
            <br />
            <BlogList /> {/* context: user, blogUpdate */}
          </>
        )}
      </div>
    </UserAuthenticationContext.Provider>
  )
}

export default App
