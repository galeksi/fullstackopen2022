import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  destroyBlog,
} from './reducers/blogReducer'
import { loginUser, setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const notification = useSelector((state) => state.notifications)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotification(`${user.name} succesfully logged out`, 5))
    dispatch(clearUser())
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const updateBlogLikes = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedLikes = { likes: blog.likes + 1 }
    dispatch(likeBlog(id, updatedLikes))
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete ${blogToDelete.title}`)) {
      dispatch(destroyBlog(id))
    }
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification
        message={notification.message}
        messageType={notification.type}
      />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in&nbsp;
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={'Add blog'} buttonLabelBack={'cancel'}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <h2 className="bloglist">blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlogLikes={updateBlogLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
