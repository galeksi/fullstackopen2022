const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('CREATE', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Test blogger",
      author: "Aleksi Rendel",
      url: "https://testblog.com/",
      likes: 20
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(b => b.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Test blogger'
    )
  })

  test('unique identifier of blogs is ID', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
  })
  
  
  test('missing likes will set likes to 0', async () => {
    const newBlog = {
      title: "Test blogger no likes",
      author: "Karl Heinz Rumenigge",
      url: "https://rumenigge.com/"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })
})

describe('READ', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  
  test('missing title or url response with 400', async () => {
    const missingTitleBlog = {
      author: "Karl Heinz Rumenigge",
      url: "https://rumenigge.com/",
      likes: 10
    }
    const missingUrlBlog = {
      title: "Test blogger no likes",
      author: "Karl Heinz Rumenigge",
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(missingTitleBlog)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(missingUrlBlog)
      .expect(400)
  
  }, 100000)
})

describe('UPDATE', () => {
  test('existing blog can be updated', async () => {
    const update =
      {
        "title": "updated",
        "author": "updated",
        "url": "updated",
        "likes": 100
      }
  
    const request = await api
      .get('/api/blogs')
    expect(request.body[0]).toBeDefined()
    
    const blogToUpdateId = request.body[0].id
    console.log(blogToUpdateId)
    
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(update)
      .expect(200)
    
    expect(updatedBlog.body.title).toEqual('updated')
    expect(updatedBlog.body.author).toEqual('updated')
    expect(updatedBlog.body.url).toEqual('updated')
    expect(updatedBlog.body.likes).toEqual(100)
  })
})

describe('DELETE', () => {
  test('existing blog can be deleted', async () => {
    const existingBlogs = await api
      .get('/api/blogs')
    expect(existingBlogs.body[0]).toBeDefined()
    
    const blogId = existingBlogs.body[0].id
  
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204)
  
    await api
      .get(`/api/blogs/${blogId}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})