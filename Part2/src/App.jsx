import { useState } from 'react'

const Names=({persons})=>{
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}
const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')

  const addname=(event)=>{
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const duplicateName = persons.find(person => person.name === newName)
  if (duplicateName) {
    alert(`${newName} is already added to phonebook`)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addname}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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