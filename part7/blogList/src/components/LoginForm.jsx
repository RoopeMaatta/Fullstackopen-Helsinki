import { useState } from 'react'
import InputField from './InputField'
import { useAuthenticationContext } from '../hooks/useAuthentication'
import { useNotificationContext } from '../NotificationContext'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  const { handleLogin } = useAuthenticationContext()
  const { showNotification } = useNotificationContext()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin(username, password)
      showNotification('Logged in successfully')
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Username'
          variant='outlined'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />

        <br></br>

        <TextField
          label='Password'
          variant='outlined'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
