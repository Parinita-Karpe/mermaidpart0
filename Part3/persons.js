const mongoose = require('mongoose')

// Use your actual MongoDB connection string here
const url = process.env.MONGODB_URI || 'mongodb+srv://fullstack:YOUR_PASSWORD_HERE@cluster0.cmgxhqf.mongodb.net/phonebookApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// 3.18 / 3.15: Transform output to match frontend expectations
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)