import { useEffect, useState } from 'react' //useEffect
import countrieService from "./services/countries"

import FindCountries from './components/FindCountries';
import Results from './components/Results';





const App = () => {
  const [filterText, setFilterText] = useState("")
  const [countries, setCountries] = useState([]); // Store all countries
  const [filteredCountries, setFilteredCountries] = useState([]) // Store filterd countries
  

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }


//get all countries common names in the begining
useEffect(() => {
  countrieService
    .getAll()
    .then(data => {
      const countryNames = data.map(country => country.name.common);
      setCountries(countryNames)
      }) 
    .catch(error => {
      console.error('Failed to fetch countries:', error);
    });
}, []); 

// filter countries based on input
useEffect(() => {
  if (filterText !== "") {
    const filtered = countries.filter(
      (country) => country.search(new RegExp(filterText, "i")) !== -1
    );
    setFilteredCountries(filtered);
  } else {
    setFilteredCountries([]);
  }
}, [filterText, countries]);
  

  return (
    <div>
      <h1>Countries</h1>

      <FindCountries
      filterText={filterText} 
      handleFilterTextChange={handleFilterTextChange} 
      />

      <Results
      filterText={filterText}
      filteredCountries={filteredCountries}
      />

    </div>
  )
}

export default App