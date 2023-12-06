import { useState } from 'react'
import InputField from './InputField'
import { useAuthenticationContext } from '../hooks/useAuthentication'

const LoginForm = ( ) => {
const { handleLogin } = useAuthenticationContext();

const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [errorMessage, setErrorMessage] = useState(null)



const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    await handleLogin(username, password); 
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

  return (
    
    <form onSubmit={handleSubmit}>
    <div>
    {errorMessage}
    </div>
    
    <InputField
        label="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />

      <InputField
        label="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

    <button type="submit">login</button>
  </form>
  )
}

  export default LoginForm