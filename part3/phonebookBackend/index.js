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





app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const currentDate = new Date().toString(); // or toLocaleString()
      response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate}</p>
      `);
    })
    .catch(error => next(error));
});


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})



app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: `Person with id ${request.params.id} not found` });
      }
    })
    .catch(error => next(error))
    // .catch(error => {
    //   console.error(error);
    //   response.status(400).json({ error: 'malformatted id' });
    //     //.json contains a implicit .end() that would be used if no .json was used.
    // });
});



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end()
})




app.post('/api/persons', async (request, response, next) => {
  try {
    const body = request.body;

    const isDuplicateName = await Person.findOne({ name: new RegExp(`^${body.name}$`, 'i') });

    // handle missing content
    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'content missing: name and/or number missing'
      });
    }

    // handle duplicate name
    if (isDuplicateName) {
      return response.status(409).json({
        error: 'Name must be unique, name already in phone book'
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      //id: generateId(),
    });

    const savedPerson = await person.save();
    response.json(savedPerson);

  } catch (error) {
    next(error);
  }
});



// update
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" })
    // person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})



// Middleware to end to handle unknownEndpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })

  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})