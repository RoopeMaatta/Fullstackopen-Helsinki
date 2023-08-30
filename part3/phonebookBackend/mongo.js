const mongoose = require("mongoose")


// run with node mongo.js ${password}
const password = process.argv[2]

const url = `mongodb+srv://Roope:${password}@studiescluster.3cpluro.mongodb.net/phonebookBackend?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)



// define schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// define person model
const Person = mongoose.model('Person', personSchema)


// process.argv[0]: Path to the node executable
// process.argv[1]: Path to the script being executed
// process.argv[2+]: freely set, for example [2]=password

if (process.argv.length === 3) {
  // find all persons in Person. ({}) = search conditions, when empty finds all
  Person.find({}).then(result => {
    console.log("Phonebook")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // create a person based on model
  const name = process.argv[3];
  const number = process.argv[4];
  
  const person = new Person({
    name: name,
    number: number,
  })
  
  // save person to database
  person.save().then(result => {
    console.log(`Added: "${name}", number: "${number}" to phonebook`)
    mongoose.connection.close()
  })
  
} else {
  // handle errorcase
  console.log('Invalid number of arguments');
  mongoose.connection.close();
}
