import { Link } from 'react-router-dom'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import React, { useContext } from 'react'

const NavigationBar = () => {
  const { user, handleLogout } = useContext(UserAuthenticationContext)
  const padding = {
    paddingRight: 5,
  }

  const navStyle = {
    backgroundColor: '#f0f0f0', // Light gray background
    padding: '10px 0', // Adds some vertical padding for better spacing
  }

  if (user) {
    return (
      <div style={navStyle}>
        <Link style={padding} to='/'>
          Blogs
        </Link>
        <Link style={padding} to='/users'>
          User
        </Link>
        {user !== null && (
          <>
            {user.name} is logged in
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    )
  } else {
    return
  }
}

export default NavigationBar
