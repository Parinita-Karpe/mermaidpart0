import axios from 'axios'
const baseUrl='/api/persons'

const getAll=()=>{
    return axios.get(baseUrl).then(response=>response.data)

}

const create=newPerson=>{
    return axios.post(baseUrl,newPerson).then(response=>response.data)
}

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON',
    {
        transform: (document,returnedobject)=>{
            returnedobject.id=returnedobject._id.toString()
            delete returnedobject._id
            delete returnedobject.__v
        }
    }
)

module.exports = mongoose.model('Person', personSchema)
export default{getAll, create}