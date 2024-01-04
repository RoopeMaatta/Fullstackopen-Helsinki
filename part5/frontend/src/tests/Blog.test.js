// test blog component renders blog title and author, but nor url or likes.
// css classes cna be added if needed.

import Blog from '../components/Blog'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {

  let blog
  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  beforeEach(() => {
    blog = {
      title: 'Testing Title',
      url: 'Testing Url',
      likes: 12,
      author: 'Testing Author',
      id: 1,
    }
  })

  const setupComponent = () => {
    const container = render(
      <Blog blog={blog}
        handleLike={mockHandleLike}
        handleDelete={mockHandleDelete} />
    ).container
    return { container }
  }

  test('renders content with title and author visible and details (title, url, author, likes) hidden', () => {
    const { container } = setupComponent()

    expect(screen.getByText(`${blog.title} by ${blog.author}`)).toBeVisible()

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
  })



  test('Details are shown when button is pressed', async () => {
    const { container } = setupComponent()

    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).not.toHaveStyle('display: none')

  })

  test('Pressing like button twice calls event handler twice ', async () => {
    const { container } = setupComponent()

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })

})