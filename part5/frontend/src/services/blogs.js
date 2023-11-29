const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return await response.json();
};

export default { getAll };



// import axios from 'axios'
// const baseUrl = '/api/blogs'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// export default { getAll }