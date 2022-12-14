import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      // console.log(action.payload)
      return action.payload
    },
    removeNotification(state, action) {
      return action.payload
    },
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer