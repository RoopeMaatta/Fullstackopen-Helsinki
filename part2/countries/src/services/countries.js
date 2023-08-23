import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"


const getAll = () => {
  const request = axios.get(baseUrl + "all/")
  return request.then(response => response.data)
}
const getCountry = (countryName) => {
  const request = axios.get(baseUrl + "name/" +`${countryName}`)
  return request.then(response => response.data)
}

const getCapitalWeather = (capitalName) => {
  const request = axios.get(`https://wttr.in/${capitalName}?format=3`)
  return request.then(response => response.data)
}

export default  { getAll, getCountry, getCapitalWeather }