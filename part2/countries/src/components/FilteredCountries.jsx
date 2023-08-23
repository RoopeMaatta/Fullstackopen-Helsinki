import { useEffect, useState } from 'react'
import SingleCountry from './SingleCountry'

// Render a list of filtered countries
const FilteredCountries = ({filteredCountries}) => {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null)
  
  // useEffect to reset selectedCountryIndex when filteredCountries changes
  useEffect(() => {
    setSelectedCountryIndex(null);
  }, [filteredCountries]);
  
  // when button clicked show the country
  if (selectedCountryIndex !== null) {
    return (
      <SingleCountry countryName={filteredCountries[selectedCountryIndex]}/>
      )
      
    }
    
    return (
      <ul>
      {filteredCountries.map((country, index) => {
        return (
          <li key={index}> {country} 
          <button
          onClick={()=>{
            setSelectedCountryIndex(index)
            }}>
          Show
          </button>
          </li>
          );
        })}
        </ul>
        )
      }
      
      export default FilteredCountries