import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs => sortAndSetBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortAndSetBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

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

  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject)
      console.log(addedBlog)
      setBlogs(blogs.concat(addedBlog))
      setNotification(`${addedBlog.title} was added`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Valid blog needed')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const updateBlogLikes = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const updatedLikes = { likes: blog.likes += 1 }
      // console.log(updatedLikes)
      await blogService.update(id, updatedLikes)
      const updatedBlogs = await blogService.getAll()
      sortAndSetBlogs(updatedBlogs)
      setNotification(`${blog.title} updated succesfully.`)
      setTimeout(() => setNotification(null), 5000)
    } catch(exception) {
      setErrorMessage('Error, couldnt update likes.')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      await blogService.destroy(id)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      sortAndSetBlogs(updatedBlogs)
      setNotification(`Blog was deleted succesfully.`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Couldnt delete blog.')
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
      <Togglable buttonLabel={'Add blog'} buttonLabelBack={'cancel'}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog}
          user={user}
          updateBlogLikes={updateBlogLikes} 
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
