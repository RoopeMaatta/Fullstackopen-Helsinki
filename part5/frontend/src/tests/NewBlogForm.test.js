import React from 'react'
import NewBlogForm from '../components/NewBlogForm'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'




// Mock the blogServices module
jest.mock('../services/blogs', () => ({
  create: jest.fn(() => Promise.resolve()),
}))

// Mock only the needed part of the 'react' module
jest.mock('react', () => {
  const originalReact = jest.requireActual('react')

  return {
    ...originalReact,
    useContext: jest.fn(),
  }
})

test('renders NewBlogForm without errors using mock', () => {

  const useMockContext = React.useContext
  useMockContext.mockReturnValue({
    setBlogUpdate: jest.fn(),
    showNotification: jest.fn(),
  })

  render(<NewBlogForm />)
  // Your assertions or additional test logic can be added here
})



test('renders NewBlogForm without errors using spyOn', () => {
  // Mock the useContext hook to return the desired context values
  const useContextSpy = jest.spyOn(React, 'useContext')
  useContextSpy.mockReturnValue({
    setBlogUpdate: jest.fn(),
    showNotification: jest.fn(),
  })

  render(<NewBlogForm />)
  // Your assertions or additional test logic can be added here

  useContextSpy.mockRestore()
})












// import React from 'react'
// import NewBlogForm from '../components/NewBlogForm'
// import { render, fireEvent } from '@testing-library/react'

// jest.mock('../services/blogs', () => ({
//   create: jest.fn(() => Promise.resolve()),
// }))

// test('renders NewBlogForm without errors', () => {
//   // Mock the useContext hook to return the desired context values
//   jest.spyOn(React, 'useContext').mockReturnValue({
//     user: null,
//     handleLogin: jest.fn(),
//     handleLogout: jest.fn(),
//     setBlogUpdate: jest.fn(),
//     showNotification: jest.fn(),
//   })

//   render(<NewBlogForm />)

//   // Now you can log or assert the expected values
//   console.log('Context values:', React.useContext.mock.results[0].value)
//   // Your assertions or additional test logic can be added here
// })



///// --- ////////// --- ////////// --- ////////// --- ////////// --- /////


// import NewBlogForm from '../components/NewBlogForm'
// import '@testing-library/jest-dom'
// import { render, fireEvent } from '@testing-library/react'


// jest.mock('../hooks/useAuthentication', () => ({
//   useAuthenticationContext: jest.fn(() => ({
//     user: null,
//     handleLogin: jest.fn(),
//     handleLogout: jest.fn(),
//     setBlogUpdate: jest.fn(),
//     showNotification: jest.fn(),
//   })),
// }))


// // Mock the blogServices module
// jest.mock('../services/blogs', () => ({
//   create: jest.fn(() => Promise.resolve()), // Mock the create function to resolve immediately
// }))

// test('renders NewBlogForm without errors', () => {
//   render(<NewBlogForm />)
//   // Your assertions or additional test logic can be added here
// })






///


// test('handles form submission', async () => {
//   const { getByLabelText, getByText } = render(<NewBlogForm />)

//   // Populate form fields
//   fireEvent.change(getByLabelText('title'), { target: { value: 'Test Title' } })
//   fireEvent.change(getByLabelText('author'), { target: { value: 'Test Author' } })
//   fireEvent.change(getByLabelText('url'), { target: { value: 'http://example.com' } })

//   // Submit the form
//   fireEvent.submit(getByText('Create new Blog'))

//   // Wait for the asynchronous create function to be called
//   await Promise.resolve()

//   // Your assertions or additional test logic can be added here
// })











// // Mock the context value with jest.mock
// jest.mock('../hooks/useAuthentication', () => ({
//   UserAuthenticationContext: {
//     Provider: ({ children }) => children,
//     Consumer: ({ children }) => children(jest.fn()),
//   },
// }))


// // Mock the blogServices module
// jest.mock('../services/blogs', () => ({
//   create: jest.fn(),
// }))

// describe('NewBlogForm', () => {
//   test('renders without errors', () => {
//     const { container } = render(<NewBlogForm />)
//     expect(container).toBeInTheDocument()
//   })
// })


















// --------

// Mock the UserAuthenticationContext
// jest.mock('../hooks/useAuthentication', () => ({
//   UserAuthenticationContext: {
//     setBlogUpdate: jest.fn(),
//     showNotification: jest.fn(),
//   },
// }))

// describe('NewBlogForm', () => {

//   test('renders NewBlogForm component', () => {
//     render(<NewBlogForm />)
//   })

//   test('calls event handler with the right details when a new blog is created', async () => {
//     const mockCreate = jest.fn()

//     // Render the component, passing the mocked create function
//     const { getByLabelText, getByText } = render(
//       <NewBlogForm create={mockCreate} />
//     )

//     // Fill out the form
//     fireEvent.change(getByLabelText(/title/i), { target: { value: 'Test Title' } })
//     fireEvent.change(getByLabelText(/author/i), { target: { value: 'Test Author' } })
//     fireEvent.change(getByLabelText(/url/i), { target: { value: 'http://test-url.com' } })

//     // Submit the form
//     fireEvent.click(getByText(/create new blog/i))

//     // Wait for the asynchronous create function to be called
//     await waitFor(() => expect(mockCreate).toHaveBeenCalled())

//     // Check if the create function was called with the right details
//     expect(mockCreate).toHaveBeenCalledWith({
//       title: 'Test Title',
//       author: 'Test Author',
//       url: 'http://test-url.com',
//     })

//   })
// })


// import NewBlogForm from '../components/NewBlogForm'
// import '@testing-library/jest-dom'
// import { render, screen, fireEvent } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

// import * as authenticationModule from '../hooks/useAuthentication'

// // Mock the useAuthentication module
// jest.mock('../hooks/useAuthentication', () => ({
//   useAuthenticationState: jest.fn(),
//   useAuthenticationContext: jest.fn(),
// }))

// describe('<NewBlogForm />', () => {

//   test('updates parent state and calls onSubmit', () => {
//     const mockSetBlogUpdate = jest.fn()
//     const mockShowNotification = jest.fn()

//     const mocknewBlogFormRef = jest.fn()
//     const user = userEvent.setup()

//     // Provide the mocked context values
//     authenticationModule.useAuthenticationState.mockReturnValue({
//       user: null, // Provide your desired mock user here
//       handleLogin: jest.fn(),
//       handleLogout: jest.fn(),
//     })

//     const inputData = {
//       title: 'testTitle',
//       author: 'testAuthor',
//       url: 'testUrl' }

//     render (
//       <NewBlogForm/>
//     )
//     screen.debug()

//     // const titleInput = screen.getByPlaceholderText('Enter title')
//     // const authorInput = screen.getByPlaceholderText('Enter author')
//     // const urlInput = screen.getByPlaceholderText('Enter URL')
//     // const submitButton = screen.getByText('Create new Blog')
//     // fireEvent.submit(screen.querySelector('.newBlogFormClassName'))


//     // userEvent.type(titleInput, inputData.title)
//     // userEvent.type(authorInput, inputData.author)
//     // userEvent.type(urlInput, inputData.url)
//     // userEvent.click(submitButton)

//     // expect(mockCreateBlog.mock.calls).toHaveLength(1)
//     // expect(mockCreateBlog.mock.calls[0][0]).toEqual(inputData)
//     // expect(mockShowNotification.mock.calls).toHaveLength(1)
//   })
// })