import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [highId, setHighId] = useState(1)

  const addContact = (event) => {
    event.preventDefault() // prevent default form submit logic
    // console.log("Button clicked", event.target)
    const contactObject = {
      name: newName,
      phoneNumber: "placeholder 3230948203",
      id: highId+1
    }
    setPersons(persons.concat(contactObject))
    setHighId(highId+1)
    setNewName("")
  }

  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addContact}>
        <div>
          name: 
          <input
          value = {newName}
          onChange={handleContactChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      ...
      <ul>{persons.map(person => (<li key={person.id}>{person.name}</li>))}</ul>

      <div>debug: {newName}</div>

    </div>
  )
}

export default App