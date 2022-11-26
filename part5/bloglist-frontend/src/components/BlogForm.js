const BlogForm = ({
  addBlog,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  author,
  title,
  blogUrl
}) => {
  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={title} onChange={handleTitleChange} /> <br />
          author: <input value={author} onChange={handleAuthorChange} /> <br />
          url: <input value={blogUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm