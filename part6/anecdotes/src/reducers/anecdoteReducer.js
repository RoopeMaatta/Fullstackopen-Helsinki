import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
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

    createAnecdote( state, action ) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const { createAnecdote, voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer


// // Alla vanha //
// const reducer = (state = initialState, action) => {
//   //console.log('state now: ', state)
//   //console.log('action', action)

//   switch (action.type) {
//   case 'VOTE_FOR': {
//     const { id } = action.payload
//     // Find the anecdote with the given ID
//     const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
//     // Increment the votes of the found anecdote
//     const updatedAnecdote = {
//       ...anecdoteToUpdate,
//       votes: anecdoteToUpdate.votes + 1
//     }
//     // Return a new state array with the updated anecdote
//     return state.map(anecdote =>
//       anecdote.id === id ? updatedAnecdote : anecdote
//     )
//   }
//   case 'NEW_ANECDOTE':
//     return [...state, action.payload]
//   case 'ZERO':
//     return initialState
//   default:
//     return state
//   }
// }

// // action
// export const voteFor = (id) => {
//   return {
//     type: 'VOTE_FOR',
//     payload: { id }
//   }
// }

// // action
// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default reducer