import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} succesfully logged in`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setNotification(`${user.name} succesfully logged out`)
    setTimeout(() => setNotification(null), 5000)
    setUser(null)
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>Add blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogForm
          title={title} 
          handleTitleChange={handleTitleChange}
          author={author} 
          handleAuthorChange={handleAuthorChange}
          url={blogUrl} 
          handleUrlChange={handleUrlChange}
          addBlog={addBlog}
        />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>  
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: blogUrl
    }
    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setAuthor('')
      setTitle('')
      setBlogUrl('')
      setNotification(`${addedBlog.title} was added`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Valid blog needed')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  
  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notification} />
      <Error message={errorMessage} />
      {user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged-in&nbsp;
           <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      }
      {blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
