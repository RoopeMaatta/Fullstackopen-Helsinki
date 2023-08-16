

// Render a single persons details
const Person = ({person, deleteContact}) => {

    const handleDelete = () => {
        deleteContact(person.id)
    }

    return (
      <li>{person.name} {person.number}
      <button type="button" onClick={handleDelete}>Delete</button>
       </li>
    )
  }

  
  export default Person;