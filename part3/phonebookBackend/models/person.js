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


// define schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
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