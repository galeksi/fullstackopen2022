import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog rendering', () => {
  const blog = {
    title: 'Testing blog frontend render',
    author: 'Tester',
    url: 'www.test.com',
    likes: 1000,
    user: {
      username: 'testuser',
      name: 'user',
      id: '1234'
    }
  }
  const user = {
    username: 'testuser',
    name: 'user',
    id: '1234'
  }
  const mockHandlerLikes = jest.fn()
  const mockHandlerDelete = jest.fn()

  let container

  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      user={user}
      updateBlogLikes={mockHandlerLikes}
      deleteBlog={mockHandlerDelete}
    />).container
  })

  test('collapsed blog renders only title and author', () => {
    // screen.debug()
    const divShort = container.querySelector('.blogShort')
    expect(divShort).toHaveTextContent('Testing blog frontend render')
    expect(divShort).toHaveTextContent('Tester')
    expect(divShort).not.toHaveTextContent('www.test.com')
    expect(divShort).not.toHaveTextContent('1000')
    expect(divShort).not.toHaveStyle('display: none')

    const divLong = container.querySelector('.blogLong')
    expect(divLong).toHaveStyle('display: none')
  })

  test('clicking view uncollapses blog', async () => {
    const screenUser = userEvent.setup()
    const button = screen.getByText('view')
    await screenUser.click(button)

    const div = container.querySelector('.blogLong')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.test.com')
    expect(div).toHaveTextContent('1000')
  })

  test('clicking like twice calls event handler twice', async () => {
    const screenUser = userEvent.setup()
    const button = screen.getByText('like')
    await screenUser.click(button)
    await screenUser.click(button)

    expect(mockHandlerLikes.mock.calls).toHaveLength(2)
  })
})
