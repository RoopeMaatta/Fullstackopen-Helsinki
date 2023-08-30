const express = require('express')
const morgan = require("morgan")
const cors = require("cors")

const app = express()

require('dotenv').config()
const Person = require("./models/person")






// remember to se set port visibility to public
app.use(cors())
app.use(express.json())
// app.use(morgan("tiny"))

app.use(express.static('build'))




// Define a new format string, similar to "tiny" but with :postPayload at the end
morgan.format('tinyWithPost', ':method :url :status :res[content-length] - :response-time ms :postPayload');

// Create a token for the JSON payload of POST requests
morgan.token('postPayload', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Use the new format string
app.use(morgan('tinyWithPost'));




// let persons = [
  
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
  
// ]

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
  Person.find({}).then(persons => {
    response.json(persons)
  })
})




// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)
  
//   if (person) {
//     response.json(person)
//   } else { 
//     response.status(404).json({ error: `Person with id ${id} not found` })
    
//     // // if content-type not set on ipad/safari a downloa alert pops up
//     // response.set('Content-Type', 'text/plain')
//     // response.status(404).end()
//   }
// })

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person=> {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: `Person with id ${request.params.id} not found` });
      }
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'An error occurred' });
    });
});



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})





// const generateId = () => {
//   const maxId = persons.length > 0
//   ? Math.max(...persons.map(n => n.id))
//   : 0
//   return maxId + 1
// }

  app.post('/api/persons', async (request, response) => {
    const body = request.body
    
    const isDuplicateName = await Person.findOne({ name: new RegExp(`^${body.name}$`, 'i') });
      // persons.map(n => n.name.toLowerCase())
      //   .includes(body.name.toLowerCase()) 

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
    
    const person = new Person ({
      name: body.name,
      number: body.number,
      //id: generateId(),
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    // persons = persons.concat(person)
    // response.json(person)
  })




// Middleware to end to handle unknownEndpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})