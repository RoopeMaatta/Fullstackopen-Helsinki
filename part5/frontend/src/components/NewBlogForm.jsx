import { useState, useContext } from 'react'
import InputField from './InputField'
import blogServices from '../services/blogs'
const { create } = blogServices
import { UserAuthenticationContext } from '../hooks/useAuthentication';

const NewBlogForm = () => {
  
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  
  const { setBlogUpdate } = useContext(UserAuthenticationContext); // Get setBlogUpdate from context
  
  const handleSubmitNewBlog = async (event) => {
    event.preventDefault()
    try {
      await create({title, author, url})
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogUpdate(prev => !prev)
      } catch (exception) {
        setErrorMessage('Something went wrong with creating new blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    return (
      
      <form onSubmit={handleSubmitNewBlog}>
      <div>
      {errorMessage}
      </div>
      
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
      )
    }
    
    export default NewBlogForm