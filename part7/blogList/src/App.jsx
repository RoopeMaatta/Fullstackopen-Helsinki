import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import HomePage from './views/HomePage'
import UsersPage from './views/UsersPage'
import UsersProfilePage from './views/UsersProfilePage'
import BlogDetailPage from './views/BlogDetailPage'
import { useAuthenticationState, UserAuthenticationContext } from './hooks/useAuthentication'
import { useMemo, useState } from 'react'
import { useNotificationContext } from './NotificationContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const { notification } = useNotificationContext()
  const { user, handleLogin, handleLogout } = useAuthenticationState()

  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  )

  return (
    <UserAuthenticationContext.Provider value={contextValue}>
      <Router>
        <div>
          <NavigationBar />
          <h2>Blogs</h2>
          <Notification message={notification.message} type={notification.type} />

          {user === null && (
            <Routes>
              <Route path='*' element={<LoginForm />} />
            </Routes>
          )}

          {user !== null && (
            <Routes>
              <Route path='/users' element={<UsersPage />} />
              <Route path='/users/:id' element={<UsersProfilePage />} />
              <Route path='/blogs/:id' element={<BlogDetailPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          )}
        </div>
      </Router>
    </UserAuthenticationContext.Provider>
  )
}

export default App
