const mongoose = require("mongoose")

mongoose.set('strictQuery',false)

// should be stored in env.
// user Roope


// const url = `mongodb+srv://Roope:${password}@studiescluster.3cpluro.mongodb.net/phonebookBackend?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI
console.log("connecting to", url)


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = function(value) {
  const regularExpression = /^(\d{2,3})-(\d+)$/
  return regularExpression.test(value)
}

// define schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: phoneNumberValidator,
      message: `Number must be in the format "XX-XXXXXX" or "XXX-XXXXX"`
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// define person model
const Person = mongoose.model('Person', personSchema)


module.exports = Person