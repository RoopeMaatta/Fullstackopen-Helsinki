/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    // const notificationAndDispatch = useContext(NotificationContext)
    // return notificationAndDispatch[1]
    const dispatch = useContext(NotificationContext)[1]
    return customNotificationDispatch(dispatch)
  }
  
  let notificationTimeoutId = null;
  const customNotificationDispatch = (dispatch) => (message, durationInSeconds) => {
  
    // Clearing existing timeout if any
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
    }
  
    // Inner function to dispatch SET_NOTIFICATION action
    const innerDispatch = (message) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: message });
    };
  
    // Set the notification message
    innerDispatch(message);
  
    // Schedule the notification removal after the specified duration
    notificationTimeoutId = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
    }, durationInSeconds * 1000);
  };



export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}


export default NotificationContext