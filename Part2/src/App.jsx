import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const[countries, setCountries] = useState([])
  const[search, setSearch] = useState('')

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

  const filteredCountries= countries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
   <div>
    find countries
    <input value={search} onChange={handleSearchChange} />
    {filteredCountries.length > 10 && (<p>Too many matches, specify another filter</p>)}
    {filteredCountries.length<=10 && filteredCountries.length>1 && filteredCountries.map(country => <p key={country.cca3}>{country.name.common}</p>)}
   
   {filteredCountries.length === 1 && (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>capital {filteredCountries[0].capital}</p>
      <p>area {filteredCountries[0].area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(filteredCountries[0].languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={filteredCountries[0].flags.png} alt={`flag of ${filteredCountries[0].name.common}`} />
    </div>
   )}
   </div>
  )
}

export default App