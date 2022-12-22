const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ 
    username: 'firstuser', 
    name: 'first',
    passwordHash 
  })

  await user.save()
})

describe('validation of user creation', () => { 
  
  test('validate username uniqueness', async () => {
    const newDublicateUser = {
      username: 'firstuser',
      name: 'second',
      password: 'password2',
    }

    const response = await api
      .post('/api/users')
      .send(newDublicateUser)
      .expect(400)
    expect(response.body).toEqual(
      {
      'error': 'username already in use'
    })
  })

  test('validate password', async () => {
    const newErrorUser = {
      username: 'firstuser',
      name: 'second',
    }

    const response = await api
      .post('/api/users')
      .send(newErrorUser)
      .expect(400)
    expect(response.body).toEqual(
      {
        'error': 'password must be given and at least 3 characters long'
      })

    newErrorUser.password = '12'
    const secondresponse = await api
      .post('/api/users')
      .send(newErrorUser)
      .expect(400)
    expect(secondresponse.body).toEqual(
      {
        'error': 'password must be given and at least 3 characters long'
      })
  })
  
  test('validate username', async () => {
    const newErrorUser = {
      name: 'second',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(newErrorUser)
      .expect(400)
    expect(response.body).toEqual(
      {
        'error': 'User validation failed: username: Path `username` is required.'
      })

    newErrorUser.username= 'ab'
    const secondresponse = await api
      .post('/api/users')
      .send(newErrorUser)
      .expect(400)
    expect(secondresponse.body).toEqual(
      {
        'error': 'User validation failed: username: Path `username` (`ab`) is shorter than the minimum allowed length (3).'
      })
  })
})

afterAll(() => {
  mongoose.connection.close()
})