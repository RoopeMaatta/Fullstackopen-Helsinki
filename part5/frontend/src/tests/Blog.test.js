// test blog component renders blog title and author, but nor url or likes.
// css classes cna be added if needed.

import Blog from '../components/Blog'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// // Utility function to check if an element or its ancestors have display: none
// const hasAncestorWithDisplayNone = (element) => {
//   let currentElement = element

//   // Traverse up the DOM tree
//   while (currentElement) {
//     const style = window.getComputedStyle(currentElement)

//     // Check if the current element has display: none
//     if (style.display === 'none') {
//       return true
//     }

//     // Move to the parent element
//     currentElement = currentElement.parentElement
//   }

//   // No ancestor with display: none found
//   return false
// }


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

  test('renders content with title and author visible and details (title, url, author, likes) hidden', () => {

    const { container } = render(<Blog blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
    />)

    expect(screen.getByText(`${blog.title} by ${blog.author}`)).toBeVisible()

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
  })



  test('Details are shown when button is pressed', async () => {
    const { container } = render(<Blog blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
    />)

    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).not.toHaveStyle('display: none')

  })

  test('Pressing like button twice calls event handler twice ', async () => {
    const { container } = render(<Blog blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
    />)

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})