import { useState } from 'react'

const Blog = ({blog, user, updateBlogLikes, deleteBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => { setVisible(!visible) }

  return ( 
    <div>
      <div style={Object.assign(showWhenVisible, blogStyle)}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={Object.assign(hideWhenVisible, blogStyle)}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button><br/>
        {blog.url}<br/>
        likes&nbsp;{blog.likes}&nbsp;<button onClick={() => updateBlogLikes(blog.id)}>like</button><br/>
        {blog.user.name}<br />
        {blog.user.id}<br />
        {user.id}<br />
        {user && blog.user.id === user.id
          ? <button onClick = { () => deleteBlog(blog.id)}>Delete</button> 
          : null
        }
      </div>
  </div> 
)}

export default Blog