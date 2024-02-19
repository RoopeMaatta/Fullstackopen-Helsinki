import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState(state, action) {
      state.message = action.payload.message
    },
    removeNotification(state) {
      state.message = ''
    },
  },
})

export const { setNotificationState, removeNotification } = notificationSlice.actions


let notificationTimeoutId = null

export const setNotification = (message, durationInSeconds) => {
  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId)
  }
  return (dispatch) => {
    // Set the notification message
    dispatch(setNotificationState({ message }))

    // Schedule the notification removal after the specified duration
    notificationTimeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, durationInSeconds * 1000)
    console.log(notificationTimeoutId)
  }
}

export default notificationSlice.reducer
