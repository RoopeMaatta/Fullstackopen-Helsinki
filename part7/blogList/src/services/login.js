import axios from 'axios'
const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
