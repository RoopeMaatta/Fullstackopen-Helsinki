import { useState } from 'react'
import InputField from './InputField'
import { useAuthenticationContext } from '../hooks/useAuthentication'

const LoginForm = () => {
  const { handleLogin, showNotification } = useAuthenticationContext()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin(username, password)
      showNotification('Logged in successfully')
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label='Username'
        id='username'
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}
        placeholder='username'
      />

      <InputField
        label='Password'
        id='password'
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
        placeholder='password'
      />

      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
