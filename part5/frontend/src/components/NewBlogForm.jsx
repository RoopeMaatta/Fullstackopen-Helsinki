import { useState, useContext, useRef } from 'react'
import InputField from './InputField'
import Togglable from './Togglable'
import blogServices from '../services/blogs'
const { create } = blogServices
import { UserAuthenticationContext } from '../hooks/useAuthentication'

const NewBlogForm = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { setBlogUpdate, showNotification } = useContext(UserAuthenticationContext)
  const newBlogFormRef = useRef()

  const handleSubmitNewBlog = async (event) => {
    event.preventDefault()
    try {
      await create({ title, author, url })
      showNotification('New blog added successfully')
      setTitle('')
      setAuthor('')
      setUrl('')
      newBlogFormRef.current.toggleVisibility()
      setBlogUpdate(prev => !prev)
    } catch (exception) {
      showNotification('Something went wrong with creating new blog', 'error')
    }
  }





  return (
    <Togglable buttonLabel="Create new blog" ref = { newBlogFormRef }>
      <form onSubmit={handleSubmitNewBlog}>

        <InputField
          label="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />

        <InputField
          label="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />

        <InputField
          label="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />

        <button type="submit">Create new Blog</button>
      </form>
    </Togglable>
  )
}

export default NewBlogForm