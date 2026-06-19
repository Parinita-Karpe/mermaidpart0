import { useState, useEffect} from 'react'
import Notification from './components/Notification'
import personService from './services/persons'

const Names=({persons, deleteName})=>{
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}: {person.number} <button onClick={()=>deleteName(person.id,person.name)}>delete</button></p>)}
      
    </div>
  )
}
const Filter=({filter, handleFilterChange})=>{
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}
const PersonForm=({addname, newName, handleNameChange, newNumber, handleNumberChange})=>{
  return (
    <form onSubmit={addname}>
        
        <div>
          <h3>add a new</h3>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  
  useEffect(() => {
  personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
}, [])
  
  const addname=(event)=>{
    event.preventDefault()
    console.log('button clicked', event.target)
     const duplicateName = persons.find(person => person.name === newName)
    if (duplicateName) {
    alert(`${newName} is already added to phonebook`)
    setNewName('')  
    return 
  }
  const nameObject = {
        name: newName,
        number: newNumber
      }
  personService
    .create(nameObject)
    .then(response => {
      setMessage(`Added ${response.data.name}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
     setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setFilter('')
    })
      
  }
const deleteName = (id) => {
  const person = persons.find(p => p.id === id)
  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setMessage(
    `Information of ${person.name} has already been removed from server`
  )

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  setPersons(persons.filter(p => p.id !== id))
      })
  }
}


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


 const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addname={addname} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Names persons={filteredPersons} deleteName={deleteName} />
      
    </div>
  )
}

export default App