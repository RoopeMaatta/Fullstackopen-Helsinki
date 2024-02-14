import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { setNotification, removeNotification } from './../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(createAnecdote(content))
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))

    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch(setNotification({ message: `You created anecdote: ${content}`, timeoutId }))
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm