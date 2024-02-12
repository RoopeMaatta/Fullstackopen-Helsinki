import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './../reducers/anecdoteReducer'
import { setNotification, removeNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const [notificationTimeout, setNotificationTimeout] = useState(null)

  const anecdotes = useSelector(({ filterText, anecdotes }) => {
    // Filter and Sort the anecdotes by number of votes in descending order
    return [...anecdotes]
      .filter((object) => object.content.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })

  const vote = (id) => {
    // Find the voted anecdote
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)

    // Dispatch the voteFor action
    dispatch(voteFor(id))

    // Dispatch setNotification with message and timeout ID
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch(setNotification({ message: `You voted for: ${votedAnecdote.content}`, timeoutId }))
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