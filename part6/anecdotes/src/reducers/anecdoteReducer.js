import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    updateVote( state, action ) {
      const { id, votes } = action.payload
      return state.map(anecdote =>
        anecdote.id === id ? { ...anecdote, votes } : anecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes( state, action ) {
      return action.payload
    }
  }
})

export const { updateVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = id => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState().anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = await anecdoteService.updateVoteDb(id, anecdoteToUpdate)
    dispatch(updateVote({ id, votes: updatedAnecdote.votes }))
  }
}


export default anecdoteSlice.reducer

