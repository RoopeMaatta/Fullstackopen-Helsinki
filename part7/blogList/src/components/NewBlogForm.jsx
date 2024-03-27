import { useState, useContext, useRef } from 'react'
import InputField from './InputField'
import Togglable from './Togglable'
import blogServices from '../services/blogs'
const { create } = blogServices
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { user } = useContext(UserAuthenticationContext)
  const { setBlogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const newBlogFormRef = useRef()

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  // Use useResources hook
  const { create } = useResources(baseUrl, user.token)

  // const handleSubmitNewBlog = async (event) => {
  //   event.preventDefault()
  //   try {
  //     await create({ title, author, url })
  //     showNotification('New blog added successfully')
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     newBlogFormRef.current.toggleVisibility()
  //     setBlogUpdate((prev) => !prev)
  //   } catch (exception) {
  //     showNotification('Something went wrong with creating new blog', 'error')
  //   }
  // }

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
          // No need for setBlogUpdate here since React Query will handle the update
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
        <InputField
          label='title'
          type='text'
          id='title'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter title'
        />

        <InputField
          label='author'
          type='text'
          id='author'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Enter author'
        />

        <InputField
          label='url'
          type='text'
          id='url'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          placeholder='Enter url'
        />

        <button type='submit'>Submit new Blog</button>
      </form>
    </Togglable>
  )
}

export default NewBlogForm
