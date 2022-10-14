import { useEffect, useState } from "react";
import axios from 'axios';

const CountryData = ({ country }) => {
    const [temparature, setTemparature] = useState("")
    const [wind, setWind] = useState("")
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
        .then((response =>{
            console.log(response.data)
            setTemparature(response.data.main.temp)
            setWind(response.data.wind.speed)
        }))
    },[])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area} km²</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (<li key={language}>{language}</li>))}
      </ul>
      <img src={country.flags.png}/>
      <h1>weather in {country.capital}</h1>
      <p>temparature {temparature} celcius</p>
      <p>wind speed {wind} m/s</p>
    </div>
  );
};

export default CountryData;