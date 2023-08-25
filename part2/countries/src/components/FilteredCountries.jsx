
// Render a list of filtered countries
const FilteredCountries = ({filteredCountries, onSelectCountry}) => {
    
    return (
      <ul>
      {filteredCountries.map((country, index) => {
        return (
          <li key={index}> {country} 
          <button
          onClick={()=>onSelectCountry(index) }>
          Show
          </button>
          </li>
          );
        })}
        </ul>
        )
      }
      
      export default FilteredCountries