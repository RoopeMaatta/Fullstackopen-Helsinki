import Alert from '@mui/material/Alert'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const severity = type === 'error' ? 'error' : 'success' // Extend this logic if you use more types

  return (
    <Alert severity={severity} style={{ marginBottom: '10px' }}>
      {message}
    </Alert>
  )
}

export default Notification
