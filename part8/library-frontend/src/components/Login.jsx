import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../graphql/loginQl'
import { useApolloClient } from '@apollo/client'


const LoginForm = ({ setError, setToken }) => {
  const navigate = useNavigate()
  const client = useApolloClient()

  const [username, setUsername] = useState('Wuffel')
  const [password, setPassword] = useState('secret')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
      client.resetStore()
      navigate('/authors')
    }
  }, [result.data, setToken, result, navigate, client])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await login({ variables: { username, password } })
      setUsername('')
      setPassword('')
      // navigate('/authors')
    } catch (exception) {
      // showNotification('Wrong username or password', 'error')
    }
  }

  return (
    <>
      <br></br>
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
        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
