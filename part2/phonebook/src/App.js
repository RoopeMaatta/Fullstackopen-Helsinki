import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// Import functions: getAll, create, update:
import contactService from "./services/contacts"




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]) 
  const [newContact, setContact] = useState({name: "", number: "", id: ""})
  const [highId, setHighId] = useState(1)
  const [filterText, setFilterText] = useState("")

  
useEffect(()=>{
  console.log ("effect")
     
  contactService
    .getAll()
    .then(response => {
      console.log("Promise done", response)
      setPersons(response)
      // setHighId(response.data.length)
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
  
      contactService
      .create(newContact)
      .then( response => {  
        console.log(response)
        setPersons(persons.concat(response))
        setContact({name: '', number: ''})
        //setContact({name: '', number: '', id: highId + 1})
        //setHighId(highId+1)
      }) 
      .catch(error => {
        console.log("Error in createing new contact", error)
      })
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