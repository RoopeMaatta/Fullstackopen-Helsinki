import { useState } from 'react'
import InputField from './InputField'

// import blogService from '../services/blogs'

// Heading, title, author, url, createButton

const NewBlogForm = () => {
  
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    // try {
    //   const user = await loginService.login({
    //     title, author,
    //   })
    //   window.localStorage.setItem(
    //     'loggedAppUser', JSON.stringify(user)
    //     ) 
    //     onLogin(user)
    //     setUser(user)
    //     setTitle('')
    //     setAuthor('')
    //     setUrl('')
    //   } catch (exception) {
    //     setErrorMessage('Wrong credentials')
    //     setTimeout(() => {
    //       setErrorMessage(null)
    //     }, 5000)
    //   }
    }
    return (
      
      <form onSubmit={handleLogin}>
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