import { useMutation, useQueryClient } from '@tanstack/react-query' 
import { createAnecdote } from './../requests'
import {useNotificationDispatch} from '../NotificationContext'


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    dispatch(`You created anecdote: ${newAnecdote.content}`, 5)
    console.log("success")
    },
    onError: (error) => {
      const errorMessage = error.response.data.error || 'An unknown error occurred';
      dispatch(`Error: ${errorMessage}`) // doesn't work for some reason
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
       dispatch('Error: Anecdote must have at least 5 characters', 5);
       return;
     }
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
