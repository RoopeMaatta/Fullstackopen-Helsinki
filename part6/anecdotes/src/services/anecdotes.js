import axios from 'axios'

//const baseUrl = 'http://localhost:3001/anecdotes'
const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3001.app.github.dev/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVoteDb = async (id, object) => {
  const updatedObject = { ...object, votes: object.votes +1 }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}


export default { getAll, createNew, updateVoteDb }