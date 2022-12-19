import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      // console.log(action.payload)
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const setNotification = (message, seconds, type = 'info') => {
  return (dispatch) => {
    console.log(message)
    // clearTimeout(notificationId)
    dispatch(createNotification({ message, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const { createNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
