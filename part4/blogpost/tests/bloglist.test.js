const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithThreeBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
    __v: 0
  }
]

const listWithSixBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
    __v: 0
},
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 12,
    __v: 0
},
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 6,
    __v: 0
}
]

test('dummy returns one', () => {
  // const blogs = []
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list is empty', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list longer one, likes are calculated correctly', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(40)
  })
})

describe('favorite blog', () => {

  test('favorite blog has 10', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    // console.log(result)
    expect(result).toStrictEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 10
      }
    )
  })

  test('favorite blog has 12', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    // console.log(result)
    expect(result).toStrictEqual(
      {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 12
    }
    )
  })
})

describe('most blogs', () => {

  test('list with Robert C. Martin has 3', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    // console.log(result)
    expect(result).toStrictEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })

  test('list with Edsger W. Dijkstra has 2', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    // console.log(result)
    expect(result).toStrictEqual(
      {
        author: "Edsger W. Dijkstra",
        blogs: 2
      }
    )
  })  
})

describe('most likes', () => {

  test('list with three blogs', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    console.log(result)
    expect(result).toStrictEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 15
      }
    )
  })

  test('list with six blogs', () => {
    const result = listHelper.mostLikes(listWithSixBlogs)
    console.log(result)
    expect(result).toStrictEqual(
      {
        author: "Robert C. Martin",
        likes: 18
      }
    )
  })
})