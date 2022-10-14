import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        find countries 
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
      {countriesToShow.length === 1 ? <CountryDetails country={countriesToShow[0]} /> : null}
      {countriesToShow.length >= 10 ? <div>too many matches, specify another filter</div> : <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>}
    </div>
  );
};

export default App;
