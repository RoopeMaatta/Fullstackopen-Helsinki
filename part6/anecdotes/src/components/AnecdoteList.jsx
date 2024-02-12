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
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    //console.log('vote', id)
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)

    dispatch(voteFor(id))
    dispatch(setNotification(`You voted for: ${votedAnecdote.content}`))
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)

    // Store the timeout ID in state
    setNotificationTimeout(timeoutId)
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