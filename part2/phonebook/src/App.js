import axios from 'axios'
import { useEffect, useState } from 'react'


// Filter field
const Filter = ({filterText, handleFilterTextChange}) => {
  return (
    <div>
      Filter shown with: <input value = {filterText} onChange={handleFilterTextChange} />
    </div>
  )
}

// Form for adding new people to the phonebook
const PersonForm = ({addContact, newContact, handleInputChange}) => {
  return(
    <form onSubmit={addContact}>
    <div> name: <input value = {newContact.name} name = "name" onChange={handleInputChange}/> </div>
    <div> number: <input value = {newContact.number} name = "number" onChange = {handleInputChange}/> </div>
    <div> <button type="submit">add</button> </div>
    </form>
  )
}

// Render all people from the phonebook
const Persons = ({persons, filterText}) => {
  const filterPersons = (persons, filterText) => persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
  return (
    <ul>
      {filterPersons(persons, filterText).map(person => 
      <Person key={person.id} person={person}/>)}
    </ul>

  )
}

// Render a single persons details
const Person = ({person}) => {
  return (
    <li>{person.name} {person.number} </li>
  )
}


/**
 * The above could be moved to
 * /components folder
 * and export + import
 * 
 * I will currently keep them in the same file for easier accees and editing 
 */


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]) 
  const [newContact, setContact] = useState({name: "", number: "", id: ""})
  const [highId, setHighId] = useState(1)
  const [filterText, setFilterText] = useState("")
  


useEffect(()=>{
  console.log ("effect")
     const currentOrigin = window.location.origin; 
     const API_BASE_URL = currentOrigin.replace('3000', '3001'); // Replace '3000' with '3001'

  axios
    .get(`${API_BASE_URL}/api/persons`)
    .then(response => {
      console.log("Promise done", response, response.data)
      setPersons(response.data)
      setHighId(response.data.length)
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code outside of the 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });    
}, [])
  
  
  const addContact = (event) => {
    event.preventDefault() // prevent default form submit logic
    const normalizeStr = (str) => str.toLowerCase().replace(/\s+/g, ' ').trim()

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
    <Filter 
      filterText={filterText} 
      handleFilterTextChange={handleFilterTextChange} 
    />

    <h3>Add new a contact</h3>
    <PersonForm
    addContact={addContact}
    newContact={newContact}
    handleInputChange={handleInputChange}
    />
    
    <h4>Numbers</h4>
    <Persons
      persons={persons}
      filterText={filterText}
    />

    </div>
    )
  }
  
  export default App