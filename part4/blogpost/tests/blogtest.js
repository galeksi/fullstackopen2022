const Blog = require('../models/blog')
const testBlog = 
  {
    "title": "Hello World 5",
    "author": "Peter Pan 5",
    "url": "www.test5.com",
  }

  const newBlog = new Blog(testBlog)

  console.log(newBlog)