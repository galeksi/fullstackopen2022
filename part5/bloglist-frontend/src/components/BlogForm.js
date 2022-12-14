import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
    setAuthor('')
    setTitle('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="title"
          />{' '}
          <br />
          author:{' '}
          <input
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="author"
          />{' '}
          <br />
          url:{' '}
          <input
            id="homepage"
            value={blogUrl}
            onChange={handleUrlChange}
            placeholder="homepage"
          />
        </div>
        <div>
          <button id="add-blog-button" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
