// Render a list of filtered countries
const FilteredCountries = ({filteredCountries}) => {
    return (
      <ul>
        {filteredCountries.map((country, index) => {
          return (
            <li key={index}>
               {country}
            </li>
          );
        })}
      </ul>
    )
  }

  export default FilteredCountries