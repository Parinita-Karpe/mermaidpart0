const mongoose = require('mongoose')

// Use your actual MongoDB connection string here
const url = process.env.MONGODB_URI || 'mongodb+srv://fullstack:YOUR_PASSWORD_HERE@cluster0.cmgxhqf.mongodb.net/phonebookApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        // Matches 2 or 3 digits, a hyphen, followed by only digits to the end
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXX... or XXX-XXXXX...`
    }
  }
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