import { Link } from 'react-router-dom'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import React, { useContext } from 'react'

const NavigationBar = () => {
  const { user, handleLogout } = useContext(UserAuthenticationContext)
  const padding = {
    paddingRight: 5,
  }

  if (user) {
    return (
      <div>
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
