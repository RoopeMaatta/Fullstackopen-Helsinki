import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql/authorsQl'

const Authors = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = async event => {
    event.preventDefault()

    const bornInt = parseInt(born, 10)
    editAuthor({
      variables: {
        name,
        born: bornInt,
      },
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          Author
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>

        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
