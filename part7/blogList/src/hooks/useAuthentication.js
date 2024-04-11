import { useEffect, createContext, useContext, useReducer } from 'react'
import loginService from '../services/login'
import blogServices from '../services/blogs'

// Define action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING', // Added action type for loading state
}

// Define a reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      blogServices.setToken(action.payload.token)
      return { ...state, user: action.payload, loading: false } // Update loading to false
    case ActionTypes.LOGOUT:
      return { ...state, user: null, loading: false } // Update loading to false
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload } // Handle loading state
    default:
      return state
  }
}

export const UserAuthenticationContext = createContext()

export const useAuthenticationState = () => {
  const initialState = { user: null, loading: true } // Include loading in the initial state
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: ActionTypes.SET_USER, payload: user })
    } else {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false }) // Set loading to false if no user is found
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
    blogServices.setToken(null) // Ensure to clear the token on logout
  }

  return { ...state, handleLogin, handleLogout }
}

export const useAuthenticationContext = () => useContext(UserAuthenticationContext)

// import { useEffect, createContext, useContext, useReducer } from 'react'
// import loginService from '../services/login'
// import blogServices from '../services/blogs'

// // Define action types
// const ActionTypes = {
//   SET_USER: 'SET_USER',
//   LOGOUT: 'LOGOUT',
// }

// // Define a reducer function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case ActionTypes.SET_USER:
//       // Set the token on successful login
//       blogServices.setToken(action.payload.token)
//       return { ...state, user: action.payload }
//     case ActionTypes.LOGOUT:
//       return { ...state, user: null }
//     default:
//       return state
//   }
// }

// export const UserAuthenticationContext = createContext()

// export const useAuthenticationState = () => {
//   const initialState = { user: null }
//   const [state, dispatch] = useReducer(authReducer, initialState)

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       dispatch({ type: ActionTypes.SET_USER, payload: user })
//     }
//   }, [])

//   const handleLogin = async (username, password) => {
//     const user = await loginService.login({ username, password })
//     window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
//     dispatch({ type: ActionTypes.SET_USER, payload: user })
//   }

//   const handleLogout = () => {
//     window.localStorage.removeItem('loggedAppUser')
//     dispatch({ type: ActionTypes.LOGOUT })
//   }

//   return { user: state.user, handleLogin, handleLogout }
// }

// export const useAuthenticationContext = () => useContext(UserAuthenticationContext)
