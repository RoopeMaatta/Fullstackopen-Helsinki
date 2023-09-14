import axios from 'axios'


// when developing
 const currentOrigin = window.location.origin; 
 const API_BASE_URL = currentOrigin.replace('3000', '3001'); // Replace '3000' with '3001'
 const baseUrl = `${API_BASE_URL}/api/persons`

// when running from web
//const baseUrl ="https://phonebook-helsinkifullstack3-1x.onrender.com/api/persons"

// when running from backend
// const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteContact }