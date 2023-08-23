import SingleCountry from './SingleCountry';
import FilteredCountries from './FilteredCountries';

const Results = ({filteredCountries, filterText}) => {
    const length = filteredCountries.length;
    let message;
  
    // add: If show countrie nappia painetaan.
    if (length === 0 && filterText !== "") {
        message = "No countries match your search";
    } else if (length === 1) {
        return <SingleCountry countryName={filteredCountries[0]} />
    } else if (length <= 10) {
        return <FilteredCountries filteredCountries={filteredCountries}/>
    } else if (length > 10) {
        message = "Too many results, narrow down your search";
    } else {
        message = "error: something went wrong";
    }
  
    return <div>{message}</div>;
}

export default Results