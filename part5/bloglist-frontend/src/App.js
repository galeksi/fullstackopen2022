import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from 'react-router-dom'
// import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser, clearUser } from './reducers/userReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  destroyBlog,
} from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const initializeUsers = async () => {
    const initialUsers = await userService.getAll()
    // console.log(initialUsers)
    setUsers(initialUsers)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    initializeUsers()
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

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete ${blogToDelete.title}`)) {
      dispatch(destroyBlog(id))
    }
  }

  const BlogList = ({ blogs }) => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }
    return (
      <div>
        <h2 className="bloglist">blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    )
  }

  const BlogView = ({ blogs }) => {
    const id = useParams().id
    const blog = blogs.find((u) => u.id === id)
    if (!blog) {
      return null
    }

    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes}&nbsp;likes&nbsp;
          <button onClick={() => updateBlogLikes(blog.id)}>like</button>
          <div>added by: {blog.author}</div>
          {user && blog.user.id === user.id ? (
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          ) : null}
        </div>
      </div>
    )
  }

  const Users = ({ users }) => {
    // console.log(users)
    return (
      <div>
        <h2 className="users">Users</h2>
        <table>
          <tbody>
            <tr>
              <td>User name</td>
              <td>blogs created</td>
            </tr>
            {users.map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td style={{ textAlign: 'right' }}>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const UserView = ({ users }) => {
    const id = useParams().id
    const user = users.find((u) => u.id === id)

    if (!user) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user ? (
            <>
              <em>{user.name} logged-in&nbsp;</em>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : null}
        </div>
        <Notification
          message={notification.message}
          messageType={notification.type}
        />
        <h1>Bloglist</h1>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <Togglable buttonLabel={'Add blog'} buttonLabelBack={'cancel'}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
        )}

        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/blogs/:id" element={<BlogView blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<UserView users={users} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
