
// Filter field
const Filter = ({filterText, handleFilterTextChange}) => {
    return (
      <div>
        Filter shown with: <input value = {filterText} onChange={handleFilterTextChange} />
      </div>
    )
  }
  
  export default Filter;