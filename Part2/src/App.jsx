import { useState } from 'react'

const Names=({persons})=>{
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addname=(event)=>{
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  const addNumber=(event)=>{
      event.preventDefault()
      console.log('button clicked', event.target)
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const duplicateName = persons.find(person => person.name === newName)
  if (duplicateName) {
    alert(`${newName} is already added to phonebook`)
    setNewName('')  
    return 
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addname}>
        
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <Names persons={persons} />
    </div>
  )
}

export default App