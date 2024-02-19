import axios from 'axios'
const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3001.app.github.dev/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

// axios.get(`${baseUrl}/${id}`)
  
