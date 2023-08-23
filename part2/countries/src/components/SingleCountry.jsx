
import { useEffect, useState } from 'react'
import DataItem from "./DataItem"
import LanguageList from "./ListItems"
import countrieService from "../services/countries"  


const SingleCountry = ({countryName}) => {
    const [countryData, setCountryData] = useState(null)
    
    useEffect( ()=> {
        countrieService
        .getCountry(countryName)
        .then( data => {
            setCountryData(data)
        })
        .catch(error => {
            console.error('Failed to fetch single country:', error);
        })
    }, [countryName]) 
    
    if (!countryData) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        <h2>{countryData.name?.common || "Unknown Country"}</h2>
        
        <DataItem label="Capital" value={countryData.capital?.[0]} />
        <DataItem label="Area" value={countryData.area ? `${countryData.area} sq. km` : null} />
        <DataItem label="Population" value={countryData.population} />
        
        <LanguageList label="Language" values={countryData.languages} />
        
        {countryData.flags && countryData.flags.png && (
            <img src={countryData.flags.png} alt={`Flag of ${countryData.name?.common || "Unknown"}`} width="200" />
            )}
            </div>
            );
            
        }
        
        export default SingleCountry
        