import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

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
    replaceBlog(state, action) {
      const updatedBlog = action.payload
      const blogs = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
      return sortBlogs(blogs)
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
    const sortedBlogs = sortBlogs(blogs)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      console.log(newBlog)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} was added`, 5))
    } catch (exception) {
      dispatch(setNotification('Valid blog needed', 5, 'error'))
    }
  }
}

export const updateBlog = (id, updatedField) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, updatedField)
      dispatch(replaceBlog(updatedBlog))
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

export const { addBlog, setBlogs, replaceBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
