import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Dumb dog starting notification',
  reducers: {
    showNotification( state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer