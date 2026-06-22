
const baseurl='/api/persons'


const morgan=require('morgan')
const cors = require('cors')
const express = require('express')


const app = express()
app.use(cors())
app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook Backend info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  )

})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.post('/api/persons/', (request, response) => {
  const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }
    const existingPerson = persons.find(person => person.name === body.name)
    if (existingPerson) {
        return response.status(400).json({  
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: (Math.floor(Math.random() * 100000)).toString(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
}
)
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personIndex = persons.findIndex(person => person.id === id)
  if (personIndex !== -1) {
    persons.splice(personIndex, 1)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))





const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})