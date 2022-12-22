import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const navigate = useNavigate()

  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
    }
    createBlog(blogObject)
    navigate('/')
    setAuthor('')
    setTitle('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Add blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="title"
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="author"
          />
          <Form.Label>URL:</Form.Label>
          <Form.Control
            id="homepage"
            value={blogUrl}
            onChange={handleUrlChange}
            placeholder="homepage"
          />
          <Button variant="primary" id="add-blog-button" type="submit">
            ADD
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
