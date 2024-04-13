import React, { useContext } from 'react'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box, Tooltip } from '@mui/material'

const NavigationBar = () => {
  const { user, handleLogout } = useContext(UserAuthenticationContext)

  if (!user) {
    return null // Render nothing if no user is logged in
  }

  return (
    <AppBar
      position='static'
      color='default'
      aria-label='main navigation menu'
      style={{ marginBottom: 20 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Tooltip title='View Blogs' enterDelay={1000}>
            <Button color='inherit' component={RouterLink} to='/' sx={{ marginRight: 2 }}>
              Blogs
            </Button>
          </Tooltip>
          <Tooltip title='View User Profile' enterDelay={1000}>
            <Button color='inherit' component={RouterLink} to='/users'>
              User
            </Button>
          </Tooltip>
        </Box>
        <Typography variant='subtitle1' component='div' sx={{ flexGrow: 0, marginRight: 2 }}>
          {user.name} is logged in
        </Typography>
        <Tooltip title='Logout' enterDelay={1000}>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar

// import { Link } from 'react-router-dom'
// import { UserAuthenticationContext } from '../hooks/useAuthentication'
// import React, { useContext } from 'react'

// const NavigationBar = () => {
//   const { user, handleLogout } = useContext(UserAuthenticationContext)
//   const padding = {
//     paddingRight: 5,
//   }

//   const navStyle = {
//     backgroundColor: '#f0f0f0', // Light gray background
//     padding: '10px 0', // Adds some vertical padding for better spacing
//   }

//   if (user) {
//     return (
//       <div style={navStyle}>
//         <Link style={padding} to='/'>
//           Blogs
//         </Link>
//         <Link style={padding} to='/users'>
//           User
//         </Link>
//         {user !== null && (
//           <>
//             {user.name} is logged in
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         )}
//       </div>
//     )
//   } else {
//     return
//   }
// }

// export default NavigationBar
