
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

  export default PersonForm;