import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/booksQl'
import { useState, useEffect } from 'react'
import { USER_FAVOURITE_GENRE } from '../graphql/userQl'

const Recommendations = props => {
  const [selectedGenre, setSelectedGenre] = useState('')
  // const favouriteGenre = useQuery(USER_FAVOURITE_GENRE)
  const {
    loading: loadingGenre,
    error: errorGenre,
    data: dataGenre,
  } = useQuery(USER_FAVOURITE_GENRE)

  useEffect(() => {
    if (dataGenre && dataGenre.me) {
      setSelectedGenre(dataGenre.me.favoriteGenre)
    }
  }, [dataGenre])

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  })

  if (books.loading || loadingGenre) {
    return <div>loading...</div>
  }
  if (books.error) {
    return <div>Error fetching books: {books.error.message} </div>
  }
  if (errorGenre) {
    return <div>Error fetching favorite genre: {errorGenre.message} </div>
  }

  const noBooks = books.data?.allBooks?.length === 0

  return (
    <div>
      <h2>recommendations</h2>
      {dataGenre && dataGenre.me && <div>Users favourite Genre: {dataGenre.me.favoriteGenre}</div>}

      {noBooks ? (
        <p>No books available in this genre.</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map(book => (
              <tr key={book.id || book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Recommendations
