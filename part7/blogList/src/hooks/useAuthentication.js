import { useEffect, createContext, useContext, useReducer } from 'react'
import loginService from '../services/login'
import blogServices from '../services/blogs'

// Define action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
}

// Define a reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      // Set the token on successful login
      blogServices.setToken(action.payload.token)
      return { ...state, user: action.payload }
    case ActionTypes.LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export const UserAuthenticationContext = createContext()

export const useAuthenticationState = () => {
  const initialState = { user: null }
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: ActionTypes.SET_USER, payload: user })
    }
  }, [])

  const handleLogin = async (username, password) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    dispatch({ type: ActionTypes.SET_USER, payload: user })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    dispatch({ type: ActionTypes.LOGOUT })
  }

  return { user: state.user, handleLogin, handleLogout }
}

export const useAuthenticationContext = () => useContext(UserAuthenticationContext)

// import { useState, useEffect, createContext, useContext } from 'react'
// import loginService from '../services/login'
// import blogServices from '../services/blogs'
// const { setToken } = blogServices

// export const UserAuthenticationContext = createContext(null)

// export const useAuthenticationState = () => {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       //console.log('user:', user)
//       setToken(user.token)
//     }
//   }, [])

//   const handleLogin = async (username, password) => {
//     const user = await loginService.login({ username, password })
//     window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
//     setUser(user)
//     setToken(user.token)
//   }

//   const handleLogout = () => {
//     window.localStorage.removeItem('loggedAppUser')
//     setUser(null)
//   }

//   return { user, handleLogin, handleLogout }
// }

// export const useAuthenticationContext = () => useContext(UserAuthenticationContext)
