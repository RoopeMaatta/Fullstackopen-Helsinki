import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor( state, action ) {
      const id = action.payload
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      // console.log(JSON.parse(JSON.stringify(state))) // due to redux toolkit using immer library under the hood.
      return state.map(anecdote =>
        anecdote.id === id ? updatedAnecdote : anecdote
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

export const { voteFor, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

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

export default anecdoteSlice.reducer
