import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog form', () => {
  test('blog is submitted correctly', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('homepage')
    const sendButton = screen.getByText('add')

    await user.type(inputTitle, 'new blog')
    await user.type(inputAuthor, 'new author')
    await user.type(inputUrl, 'new homepage')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new blog')
    expect(createBlog.mock.calls[0][0].author).toBe('new author')
    expect(createBlog.mock.calls[0][0].url).toBe('new homepage')
  })
})