
import { useEffect, useState } from 'react'
import DataItem from "./DataItem"
import LanguageList from "./ListItems"
import countrieService from "../services/countries"  


const SingleCountry = ({countryName}) => {
    const [countryData, setCountryData] = useState(null)
    const [capitalWeather, setCapitalWeather] = useState()


    useEffect( ()=>{
        if (!countryName) {
            return;  // Exit the effect if countryName is not valid
        }
        countrieService
        .getCapitalWeather(countryName)
        .then( data => {
            setCapitalWeather(data)
        })
        .catch(error => {
            console.error('Failed to fetch capital weather:', error);
        })
    }, [countryName]) 

    

    //get country data
    useEffect( ()=> {
        if (!countryName) {
            return;  // Exit the effect if countryName is not valid
        }
        countrieService
        .getCountry(countryName)
        .then( data => {
            setCountryData(data)
        })
        .catch(error => {
            console.error('Failed to fetch single country:', error);
        })
    }, [countryName]) 
    
    
    // // combine get requests, but waits for both to resolve 
    // useEffect(() => {
    //     if (!countryName) {
    //         return;  // Exit the effect if countryName is not valid
    //     }
    
    //     const fetchCountryData = countrieService.getCountry(countryName);
    //     const fetchCapitalWeatherData = countrieService.getCapitalWeather(countryName);
    
    //     Promise.all([fetchCountryData, fetchCapitalWeatherData])
    //     .then(([countryResponse, capitalWeatherResponse]) => {
    //         setCountryData(countryResponse);
    //         setCapitalWeather(capitalWeatherResponse);
    //     })
    //     .catch(error => {
    //         console.error('Failed to fetch data:', error);
    //     });
    
    // }, [countryName]);


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

        <div> {!capitalWeather ? "Loading weather data..." : capitalWeather } </div>
        
        </div>

            
            )
            
        }
        
        export default SingleCountry
        