import Person from './Person';


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

  
  export default Persons;