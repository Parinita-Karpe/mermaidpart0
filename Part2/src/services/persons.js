import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
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
export default {
  getAll,
  create,
  remove
}