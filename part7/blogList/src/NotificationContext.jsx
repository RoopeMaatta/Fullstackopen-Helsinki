/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useCallback } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR_NOTIFICATION':
      return { message: null, type: null }
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const initialState = { message: null, type: null }
  const [notification, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = useCallback(
    (message, type = 'success') => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000) // Reset after 5 seconds
    },
    [dispatch]
  )

  const value = { notification, showNotification }

  return <NotificationContext.Provider value={value}>{props.children}</NotificationContext.Provider>
}

export const useNotificationContext = () => useContext(NotificationContext)
