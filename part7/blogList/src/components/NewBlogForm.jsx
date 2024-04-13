import { useState, useContext, useRef } from 'react'
import InputField from './InputField'
import Togglable from './Togglable'
import blogServices from '../services/blogs'
const { create } = blogServices
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'
import { TextField, Button } from '@mui/material'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { user } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const newBlogFormRef = useRef()

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  const { create } = useResources(baseUrl, user?.token)

  const handleSubmitNewBlog = async (event) => {
    event.preventDefault()
    create(
      { title, author, url },
      {
        onSuccess: () => {
          showNotification('New blog added successfully')
          setTitle('')
          setAuthor('')
          setUrl('')
          newBlogFormRef.current.toggleVisibility()
        },
        onError: (error) => {
          showNotification('Something went wrong with creating new blog', 'error')
        },
      }
    )
  }

  return (
    <Togglable buttonLabel='Create new blog' ref={newBlogFormRef}>
      <form className='newBlogFormClassName' onSubmit={handleSubmitNewBlog}>
        <TextField
          label='Title'
          type='text'
          variant='outlined'
          id='title'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          margin='normal'
        />

        <TextField
          label='Author'
          type='text'
          variant='outlined'
          id='author'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          margin='normal'
        />

        <TextField
          label='URL'
          type='text'
          variant='outlined'
          id='url'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          margin='normal'
        />

        <Button type='submit' variant='contained' color='primary'>
          Submit New Blog
        </Button>
      </form>
    </Togglable>
  )
}

export default NewBlogForm
