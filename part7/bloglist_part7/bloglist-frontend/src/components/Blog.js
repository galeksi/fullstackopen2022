// ### NOT IN USE

// import { useState } from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

// const Blog = ({ blog, user, updateBlogLikes, deleteBlog }) => {
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5,
//   }

//   const [visible, setVisible] = useState(true)
//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const showWhenVisible = { display: visible ? '' : 'none' }
//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }

//   return (
//     <div className="blog">
//       <div
//         className="blogShort"
//         style={Object.assign(showWhenVisible, blogStyle)}
//       >
//         <Link to={`/blogs/${blog.id}`}>
//           {blog.title} {blog.author}
//         </Link>
//         <button onClick={toggleVisibility}>view</button>
//       </div>
//       <div
//         className="blogLong"
//         style={Object.assign(hideWhenVisible, blogStyle)}
//       >
//         {blog.title} {blog.author}
//         <button onClick={toggleVisibility}>hide</button>
//         <br />
//         {blog.url}
//         <br />
//         likes&nbsp;{blog.likes}&nbsp;
//         <button onClick={() => updateBlogLikes(blog.id)}>like</button>
//         <br />
//         {blog.user.name}
//         <br />
//         {/* {blog.user.id}<br />
//         {user.id}<br /> */}
//         {user && blog.user.id === user.id ? (
//           <button onClick={() => deleteBlog(blog.id)}>Delete</button>
//         ) : null}
//       </div>
//     </div>
//   )
// }

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   updateBlogLikes: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
// }

// export default Blog
