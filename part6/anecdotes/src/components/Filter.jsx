import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'



const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const contentFilter = event.target.value
    //event.target.value = ''
    dispatch(filterChange(contentFilter))
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
    filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter