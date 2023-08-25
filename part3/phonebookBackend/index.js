const express = require('express')
const morgan = require("morgan")

const app = express()

app.use(express.json())
// app.use(morgan("tiny"))




// Define a new format string, similar to "tiny" but with :postPayload at the end
morgan.format('tinyWithPost', ':method :url :status :res[content-length] - :response-time ms :postPayload');

// Create a token for the JSON payload of POST requests
morgan.token('postPayload', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Use the new format string
app.use(morgan('tinyWithPost'));




let persons = [
  
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
  
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const currentDate = new Date().toString() // toLocaleString()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else { 
    response.status(404).json({ error: `Person with id ${id} not found` })
    
    // // if content-type not set on ipad/safari a downloa alert pops up
    // response.set('Content-Type', 'text/plain')
    // response.status(404).end()
  }
})



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})



const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + 1
}


  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    const isDuplicateName = 
      persons.map(n => n.name.toLowerCase())
        .includes(body.name.toLowerCase()) 

    // handle missing content
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing: name and/or number missing' 
      })
    }

    // handle duplicate name
    if (isDuplicateName) {
      return response.status(409).json({ 
        error: 'Name must be unique, name already in phone book' 
      })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
  })




// Middleware to end to handle unknownEndpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})