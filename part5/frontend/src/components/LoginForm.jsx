import { useState } from 'react'
import loginService from '../services/login'
import InputField from './InputField'

const LoginForm = ({ onLogin }) => {

const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [errorMessage, setErrorMessage] = useState(null)


const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedAppUser', JSON.stringify(user)
    ) 
    onLogin(user)
    setUser(user)
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
    
    <form onSubmit={handleLogin}>
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