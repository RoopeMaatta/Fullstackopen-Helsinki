import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.error('Error fetching resources:', error)
    }
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    const newResource = response.data
    setResources([...resources, newResource])
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  // const [notes, noteService] = useResource('http://localhost:3005/notes')
  // const [persons, personService] = useResource('http://localhost:3005/persons')

  const [notes, noteService] = useResource('https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3005.app.github.dev/notes')
  const [persons, personService] = useResource('https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3005.app.github.dev/persons')

  console.log("notes", notes)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App