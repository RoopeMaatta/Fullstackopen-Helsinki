import { useState } from 'react'

const normalizeInput = (str) => 
str.toLowerCase().replace(/\s+/g, ' ').trim()



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: "020 1234567", id: 1, }
  ]) 
  const [newContact, setContact] = useState({name: "", phoneNumber: "", id: ""})
  const [highId, setHighId] = useState(1)

  //const [newName, setNewName] = useState('')
  
  
  const addContact = (event) => {
    event.preventDefault() // prevent default form submit logic
    if (persons.some(person => normalizeInput(person.name) === normalizeInput(newContact.name))) {
      alert(`${newContact.name} is already added to phonebook`)
    } else if (newContact.name === "" || normalizeInput(newContact.name) === "") {
      alert("Name is empty")
    } else {
      setPersons(persons.concat(newContact))
      setContact({name: '', phoneNumber: '', id: highId + 1})
      setHighId(highId+1)
    }
  }
  
  const handleInputChange = (event) => {
    setContact({...newContact, [event.target.name]: event.target.value})
  }

  
  return (
    <div>
    <h2>Phonebook</h2>
    
    <form onSubmit={addContact}>
    <div> name: <input value = {newContact.name} name = "name" onChange={handleInputChange}/> </div>
    <div> number: <input value = {newContact.phoneNumber} name = "phoneNumber" onChange = {handleInputChange}/> </div>
    <div> <button type="submit">add</button> </div>
    </form>
    
    <h2>Numbers</h2>
    ...
    <ul>{persons.map(person => (<li key={person.id}>{person.name} {person.phoneNumber} </li>))}</ul>
    
    <div>debug: {newContact.name}</div>
    
    </div>
    )
  }
  
  export default App