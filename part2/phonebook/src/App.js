import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification';

// Import functions: getAll, create, update, deleteContact:
import contactService from "./services/contacts"


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto localNotFromDB', number: '040-123456', id: 1 },
  ]) 
  const [newContact, setContact] = useState({name: "", number: "", id: ""})
  const [filterText, setFilterText] = useState("")
  const [notification, setNotification] = useState({
    message: null,
    type: "succees", // "succees" or "error"
  })

  
// get all contacts from Database when app starts
useEffect(()=>{   
  contactService
    .getAll()
    .then(response => {
      setPersons(response)
    })
    .catch(error => {
      console.log("Error getting all data from server", error)
    });    
}, [])


  const addContact = (event) => {
    event.preventDefault() // prevent default form submit logic
    const normalizeStr = (str) => str.toLowerCase().replace(/\s+/g, ' ').trim()

    const existingPerson = persons.find(person => normalizeStr(person.name) === normalizeStr(newContact.name));

    // check if person.name is already in database
    if (existingPerson) {
      if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number with a new one?`)) {
        contactService
          .update(existingPerson.id, newContact)
          .then(response => {  
            setPersons(persons.map(person => person.id === existingPerson.id ? response : person))
            handleNotification(`Changed ${existingPerson.name} phone number to ${newContact.number}` , "succees")
            setContact({name: '', number: ''}) 
          }) 
          .catch(error => {
            // Log the error to console for debugging
            console.log("Error in updating contact", error);
          
            // Check if it's a validator error
            if (error.response && error.response.data && error.response.data.error) {
              console.log(error.response.data.error);
              handleNotification(`Validation failed: ${error.response.data.error}`, "error");
            }
            // Check if the error is a 404 Not Found
            else if (error.response && error.response.status === 404) {
              // Update the persons to match the current state where the existing person is missing
              setPersons(persons.filter(n => n.id !== existingPerson.id));
              handleNotification(`Information of ${existingPerson.name} has already been removed from the server`, "error");
            } 
            // General error handler
            else {
              handleNotification("An unexpected error occurred", "error");
            }
          })
          
      }
      // Check if newContact id empty
    } else if (newContact.name === "" || normalizeStr(newContact.name) === "") {
      alert("Name is empty")
    } else {

    // Create new contact
      contactService
      .create(newContact)
      .then(response => {  
        setPersons(persons.concat(response))

        handleNotification(`Added ${newContact.name}` , "succees")

        setContact({name: '', number: ''}) 
      }) 
      .catch(error => {
        handleNotification(error.response.data.error, "error")
        console.log(error.response.data.error)
        console.log("Error in creating new contact", error)
      })
    }
  }


  // WufQ: Saisiko deleteContactsin jotenkin suoraan person:ille ilman että sitä täytyisi kuljettaa persons:ssien läpi?
  const deleteContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      contactService
       .deleteContact(id)
       .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log("Error in deleting contact", error);
          
      });
       }
    
  }
  
  
  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 8000);
  };
  


  const handleInputChange = (event) => {
    setContact({...newContact, [event.target.name]: event.target.value})
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  
  return (
    <div>

    <h2>Phonebook</h2>
    <Notification message={notification.message} type={notification.type}/>

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
      deleteContact={deleteContact}
    />

    </div>
    )
  }
  
  export default App