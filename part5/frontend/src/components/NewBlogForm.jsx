import { useState, useContext } from 'react'
import InputField from './InputField'
import blogServices from '../services/blogs'
const { create } = blogServices
import { UserAuthenticationContext } from '../hooks/useAuthentication';

const NewBlogForm = () => {
  
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  
  const { setBlogUpdate, showNotification } = useContext(UserAuthenticationContext); // Get setBlogUpdate from context
  
  const handleSubmitNewBlog = async (event) => {
    event.preventDefault()
    try {
      await create({title, author, url})
      showNotification('New blog added successfully');
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogUpdate(prev => !prev)
      } catch (exception) {
          showNotification('Something went wrong with creating new blog', 'error');
      }
    }
    return (
      
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
      )
    }
    
    export default NewBlogForm