// models/person.js
const Person = require('./models/person')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI // Best practice: use env variables instead of hardcoding passwords

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Format the ID from Object to String for the frontend
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)