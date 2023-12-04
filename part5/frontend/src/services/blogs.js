// const baseUrl = '/api/blogs';

import axios from 'axios'
const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// get all blogs
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

// create a new blog 
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


export default { getAll, create, setToken };
