// const baseUrl = '/api/blogs';

import axios from 'axios'
const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }
}


// update a existing blog
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

// create a new blog
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


// Delete a existing blog
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}



export default { getAll, create, setToken, update, remove }
