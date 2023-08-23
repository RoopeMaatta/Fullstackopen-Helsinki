// input field for finding countries
const FindCountries = ({filterText, handleFilterTextChange}) => {
    return (
      <div>
          Find Countries: <input value = {filterText} onChange={handleFilterTextChange} />
      </div>
    )
  }

export default FindCountries