const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (bloglist) => {
    return bloglist.reduce((likesSum, blog) => {
    return likesSum + blog.likes
    }, 0)
} 

const favoriteBlog = (bloglist) => {
  const listByLikes = _.sortBy(bloglist, 'likes')
  // console.log(listByLikes)
  const blogWitMostLikes = listByLikes[listByLikes.length - 1]
  return {
    title: blogWitMostLikes.title,
    author: blogWitMostLikes.author,
    likes: blogWitMostLikes.likes
  }

}

const mostBlogs = (bloglist) => {
  const listByAuthor = _.countBy(bloglist, (blog) => {
    return blog.author
  })
  const sortedBlogs = Object.fromEntries(
    Object.entries(listByAuthor).sort(([, a], [, b]) => b - a)
  )
  return {
    author: Object.keys(sortedBlogs)[0],
    blogs: Object.values(sortedBlogs)[0]
  }
}

const mostLikes = (bloglist) => {
  const countedLikes = bloglist.reduce((likesSum, blog) => {
    likesSum[blog.author] = likesSum[blog.author] || 0
    likesSum[blog.author] += blog.likes
    return likesSum 
  }, {})
  const sortedLikes = Object.fromEntries(
    Object.entries(countedLikes).sort(([, a], [, b]) => b - a)
  )
  // console.log(sortedLikes)
  return {
    author: Object.keys(sortedLikes)[0],
    likes: Object.values(sortedLikes)[0]
  }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}