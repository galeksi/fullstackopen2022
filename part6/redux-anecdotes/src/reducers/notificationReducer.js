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

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, seconds * 1000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer