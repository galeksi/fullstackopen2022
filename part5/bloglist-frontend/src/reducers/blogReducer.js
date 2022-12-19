import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} was added`, 5))
    } catch (exception) {
      dispatch(setNotification('Valid blog needed', 5, 'error'))
    }
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, likedBlog)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`${updatedBlog.title} updated succesfully.`, 5))
    } catch (exception) {
      dispatch(setNotification('Error, couldnt update likes.', 5, 'error'))
    }
  }
}

export const destroyBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(id)
      dispatch(removeBlog(id))
      dispatch(setNotification('Blog deleted succesfully.', 5))
    } catch (exception) {
      dispatch(setNotification('Could not delete blog.', 5, 'error'))
    }
  }
}

export const { addBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
