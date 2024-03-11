import React from 'react'
import NewBlogForm from '../components/NewBlogForm'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogServices from '../services/blogs'

// Mock only the 'create' function from the blogServices module
jest.mock('../services/blogs', () => ({
  create: jest.fn(() => Promise.resolve()),
}))

// Mock only the needed part of the 'react' module
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => ({
    setBlogUpdate: jest.fn(),
    showNotification: jest.fn(),
  })),
}))

test('Clicking submit runs mocked Create function with inputted form data', async () => {
  const user = userEvent.setup()

  render(<NewBlogForm />)

  // Simulate a user entering data on the form
  await user.type(screen.getByPlaceholderText('Enter title'), 'Test Blog')
  await user.type(screen.getByPlaceholderText('Enter author'), 'Test Author')
  await user.type(screen.getByPlaceholderText('Enter url'), 'http://test-url.com')

  // Simulate a user clicking on the 'Create new Blog' button
  await fireEvent.click(screen.getByText('Create new Blog'))

  // Assert that the create function was called
  expect(blogServices.create).toHaveBeenCalledTimes(1)

  expect(blogServices.create).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
  })
})

test('Clicking submit runs spyOn Create function with inputted form data', () => {
  // Mock the useContext hook to return the desired context values
  const useContextSpy = jest.spyOn(React, 'useContext')
  useContextSpy.mockReturnValue({
    setBlogUpdate: jest.fn(),
    showNotification: jest.fn(),
  })

  // Spy on the create function from blogServices
  const createSpy = jest.spyOn(blogServices, 'create')

  render(<NewBlogForm />)
  // Your assertions or additional test logic can be added here

  // Simulate a user entering data on the form
  fireEvent.change(screen.getByPlaceholderText('Enter title'), { target: { value: 'Test Blog' } })
  fireEvent.change(screen.getByPlaceholderText('Enter author'), {
    target: { value: 'Test Author' },
  })
  fireEvent.change(screen.getByPlaceholderText('Enter url'), {
    target: { value: 'http://test-url.com' },
  })

  // Simulate a user clicking on the 'Create new Blog' button
  fireEvent.click(screen.getByText('Create new Blog'))

  // Assert that the create function was called
  //expect(createSpy).toHaveBeenCalledTimes(1)

  // Assert that the create function was called with the correct data
  expect(createSpy).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
  })

  // Restore the original implementations
  useContextSpy.mockRestore()
  createSpy.mockRestore()
})
