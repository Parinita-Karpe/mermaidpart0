import {useState, useEffect} from 'react'
import axios from 'axios'

const api_key =import.meta.env.VITE_API_KEY
console.log(api_key)
const App = () => {
  const[countries, setCountries] = useState([])
  const[search, setSearch] = useState('')
  const[weather, setWeather] = useState(null)

    const filteredCountries= countries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    if(filteredCountries.length === 1){
      const capital = filteredCountries[0].capital[0]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [filteredCountries])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }



  return (
   <div>
    find countries
    <input value={search} onChange={handleSearchChange} />
    {search !== '' && filteredCountries.length > 10 && (<p>Too many matches, specify another filter</p>)}
    {filteredCountries.length<=10 && filteredCountries.length>1 && filteredCountries.map(country => ( <div key={country.cca3}>{country.name.common}
    <button onClick={() => setSearch(country.name.common)}>show</button></div>))}
   
   {filteredCountries.length === 1 && (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>capital {filteredCountries[0].capital[0]}</p>
      <p>area {filteredCountries[0].area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(filteredCountries[0].languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={filteredCountries[0].flags.png} alt={`flag of ${filteredCountries[0].name.common}`} />
      {weather && (
    <div>
      <h2>Weather in {filteredCountries[0].capital[0]}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`weather icon for ${filteredCountries[0].capital[0]}`} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )}
    </div>
   )}
   </div>
  )
}

export default App