import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // blogService.getAll().then((blogs) => sortAndSetBlogs(blogs))
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notification = useSelector((state) => state.notifications)
  const blogs = useSelector((state) => state.blogs)

  // const sortAndSetBlogs = (blogs) => {
  //   blogs.sort((a, b) => b.likes - a.likes)
  //   setBlogs(blogs)
  // }

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} succesfully logged in`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotification(`${user.name} succesfully logged out`, 5))
    setUser(null)
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

  const updateBlogLikes = async (id) => {
    return id
    // try {
    //   const blog = blogs.find((b) => b.id === id)
    //   const updatedLikes = { likes: (blog.likes += 1) }
    //   // console.log(updatedLikes)
    //   await blogService.update(id, updatedLikes)
    //   const updatedBlogs = await blogService.getAll()
    //   sortAndSetBlogs(updatedBlogs)
    //   dispatch(setNotification(`${blog.title} updated succesfully.`, 5))
    // } catch (exception) {
    //   dispatch(setNotification('Error, couldnt update likes.', 5, 'error'))
    // }
  }

  const deleteBlog = async (id) => {
    return id
    // const blogToDelete = blogs.find((b) => b.id === id)
    // if (window.confirm(`Delete ${blogToDelete.title}`)) {
    //   try {
    //     await blogService.destroy(id)
    //     const updatedBlogs = blogs.filter((blog) => blog.id !== id)
    //     sortAndSetBlogs(updatedBlogs)
    //     dispatch(setNotification(`${blogToDelete.title} deleted.`))
    //   } catch (exception) {
    //     dispatch(setNotification('Could not delete blog.', 5, 'error'))
    //   }
    // }
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
