import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: '', timeoutId: 0 }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      // console.log(action.payload)
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    },
  }
})

export const setNotification = (message, seconds, notificationId) => {
  return dispatch => {
    clearTimeout(notificationId)
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
    dispatch(createNotification({ message, timeoutId }))
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer