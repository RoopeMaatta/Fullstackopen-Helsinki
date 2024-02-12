import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filterText, anecdotes }) => {
    // Filter and Sort the anecdotes by number of votes in descending order
    return [...anecdotes]
      .filter((object) => object.content.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })


  const vote = (id) => {
    //console.log('vote', id)
    dispatch(voteFor(id))
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList