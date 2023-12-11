// test blog component renders blog title and author, but nor url or likes.
// css classes cna be added if needed.

import Blog from '../components/Blog'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'



describe('<Blog />', () => {

  test('renders content', () => {

    const mockHandleLike = jest.fn()
    const mockHandleDelete = jest.fn()

    const blog = {
      title: 'Testing Title',
      url: 'Testing Url',
      likes: 12,
      author: 'Testing Author',
      id: 1,
    }


    render(<Blog blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
    />)
    screen.debug()
  })
})