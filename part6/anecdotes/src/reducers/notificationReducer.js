import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  timeoutId: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const { message, timeoutId } = action.payload
      // Clear the existing timeout if it exists
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      // Update state immutably with Immer
      state.message = message
      state.timeoutId = timeoutId
    },
    removeNotification(state) {
      // Clear the existing timeout and reset message and timeoutId
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      state.message = ''
      state.timeoutId = null
    }
  }
})



export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer