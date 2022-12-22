import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams, Link, useMatch } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Table, Form, Button } from 'react-bootstrap'
import blogService from './services/blogs'
import userService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser, clearUser } from './reducers/userReducer'
import {
  initializeBlogs,
  createBlog,
  updateBlog,
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

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" id="login-button" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const updateBlogLikes = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedLikes = { likes: blog.likes + 1 }
    dispatch(updateBlog(id, updatedLikes))
  }

  const addBlogComment = (event) => {
    event.preventDefault()
    const id = event.target.comment.id
    const comment = event.target.comment.value
    const blog = blogs.find((b) => b.id === id)
    const updatedComments = { comments: blog.comments.concat(comment) }
    dispatch(updateBlog(id, updatedComments))
    event.target.comment.value = ''
  }

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete ${blogToDelete.title}`)) {
      dispatch(destroyBlog(id))
    }
  }

  const BlogList = ({ blogs }) => {
    return (
      <div>
        <h2 className="bloglist">Blogs</h2>
        <Table striped>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }

  const CommentList = ({ comments }) => {
    // console.log(comments)
    if (comments.length === 0) {
      return (
        <div>
          <em>No comments yet!</em>
        </div>
      )
    }
    return (
      <ul>
        {comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    )
  }

  const BlogView = ({ blog }) => {
    const id = useParams().id
    if (!blog) {
      return null
    }

    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes}&nbsp;likes&nbsp;
          <Button variant="success" onClick={() => updateBlogLikes(blog.id)}>
            like
          </Button>
          <div>added by: {blog.author}</div>
          {user && (blog.user.id === user.id || blog.user === user.id) ? (
            <Button variant="secondary" onClick={() => deleteBlog(blog.id)}>
              Delete
            </Button>
          ) : null}
        </div>
        <h2>Comments</h2>
        <div>
          <Form onSubmit={addBlogComment}>
            <Form.Group>
              <Form.Control name="comment" id={id} />
              <Button variant="primary" type="submit">
                Add comment
              </Button>
            </Form.Group>
          </Form>
        </div>
        <CommentList comments={blog.comments} />
      </div>
    )
  }

  const Users = ({ users }) => {
    // console.log(users)
    return (
      <div>
        <h2 className="users">Users</h2>
        <Table striped>
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
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        <h3>Added blogs:</h3>
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

  const navStyle = {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
  }

  return (
    <div className="container">
      <div style={navStyle}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <>
            <b>{user.name} logged-in&nbsp;</b>
            <Button variant="secondary" onClick={handleLogout}>
              logout
            </Button>
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
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserView users={users} />} />
      </Routes>
    </div>
  )
}

export default App
