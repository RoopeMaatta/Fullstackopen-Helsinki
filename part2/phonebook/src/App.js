import { useState } from 'react'

const normalizeStr = (str) => str.toLowerCase().replace(/\s+/g, ' ').trim()

const filterPersons = (persons, filterText) => persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]) 
  const [newContact, setContact] = useState({name: "", number: "", id: ""})
  const [highId, setHighId] = useState(4)
  const [filterText, setFilterText] = useState("")
  
  
  
  
  const addContact = (event) => {
    event.preventDefault() // prevent default form submit logic
    if (persons.some(person => normalizeStr(person.name) === normalizeStr(newContact.name))) {
      alert(`${newContact.name} is already added to phonebook`)
    } else if (newContact.name === "" || normalizeStr(newContact.name) === "") {
      alert("Name is empty")
    } else {
      setPersons(persons.concat(newContact))
      setContact({name: '', number: '', id: highId + 1})
      setHighId(highId+1)
    }
  }
  
  const handleInputChange = (event) => {
    setContact({...newContact, [event.target.name]: event.target.value})
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  
  


  return (
    <div>
    <h2>Phonebook</h2>
    <div>Filter shown with: <input value = {filterText} onChange={handleFilterTextChange} /> </div>

    <h2>Add new a contact</h2>
    <form onSubmit={addContact}>
    <div> name: <input value = {newContact.name} name = "name" onChange={handleInputChange}/> </div>
    <div> number: <input value = {newContact.number} name = "number" onChange = {handleInputChange}/> </div>
    <div> <button type="submit">add</button> </div>
    </form>
    
    <h2>Numbers</h2>
    <ul> {filterPersons(persons, filterText).map(person => 
            <li key={person.id}>{person.name} {person.number} </li>)} </ul>
    

    </div>
    )
  }
  
  export default App