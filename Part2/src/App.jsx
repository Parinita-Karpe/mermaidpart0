import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  personService
  .create(newObject)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    // Clear your input fields here...
  })
  .catch(error => {
    // This logs the precise validation message to the console
    console.log(error.response.data.error)
    
    // If you have an alert/notification state, show it to the user:
    alert(error.response.data.error)
  })
  return (
    <div>
      <h2>Phonebook</h2>

      {persons.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App