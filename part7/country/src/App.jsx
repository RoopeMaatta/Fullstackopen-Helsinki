import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}



const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  const getCountry = async (country) => {
  const response = await axios.get(`${baseUrl}/name/${country}`)
  return response.data
  }

  const fetchCountry = async () => {
    try {
      const countryData = await getCountry(name)
      setCountry(countryData)
      setFound(true);
    } catch (error) {
      console.error('Error fetching country:', error)
      setFound(false);
    }
  }


  useEffect(() => {
    if (name) { // Only fetch if name is truthy (i.e., not an empty string or null)
      fetchCountry();
    } else {
      setCountry(null); // Reset country to null if name is empty
      setFound(false)
    }
  }, [name])

  return {
    data: country,
    found
  }
}

const Country = ({ country }) => {
 console.log("wuf1", country)
  if (!country.data) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }


  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App