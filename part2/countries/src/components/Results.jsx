import SingleCountry from './SingleCountry';
import FilteredCountries from './FilteredCountries';
import { useEffect, useState } from 'react'

const Results = ({filteredCountries, filterText}) => {
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(null)
    const length = filteredCountries.length;
    
    
    // useEffect to reset selectedCountryIndex when filteredCountries changes
    useEffect(() => {
        setSelectedCountryIndex(null);
    }, [filteredCountries]);
    

     
    //IIFE immediately-invoked function expression to set contents value.
    const content = (() => {
        if (length === 0 && filterText !== "") {
            return "No countries match your search";
        }

        if (length === 1) {
            return <SingleCountry countryName={filteredCountries[0]} />;
        }

        if (length <= 10) {
            if (selectedCountryIndex !== null) {
                return <SingleCountry countryName={filteredCountries[selectedCountryIndex]}/>;
            }
            return <FilteredCountries 
                        filteredCountries={filteredCountries}
                        onSelectCountry={setSelectedCountryIndex} // Pass down the setter
                   />;
        }

        if (length > 10) {
            return "Too many results, narrow down your search";
        }

        return "error: something went wrong";
    })();
    
    return <div>{content}</div>;
}


export default Results