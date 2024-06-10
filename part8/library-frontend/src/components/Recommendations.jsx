import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/booksQl'
import { useState, useEffect } from 'react'
import { USER_FAVOURITE_GENRE } from '../graphql/userQl'

const Recommendations = props => {
  const [selectedGenre, setSelectedGenre] = useState('')

  const {
    loading: loadingGenre,
    error: errorGenre,
    data: dataGenre,
  } = useQuery(USER_FAVOURITE_GENRE)

  const { loading: loadingBooks, error: errorBooks, data: dataBooks } = useQuery(
    ALL_BOOKS,
    {
      variables: { genre: selectedGenre },
      skip: !selectedGenre,
    }
  )

  useEffect(() => {
    if (dataGenre && dataGenre.me) {
      const genre = dataGenre.me.favoriteGenre
      setSelectedGenre(genre)
    }
  }, [dataGenre])

  if (loadingBooks || loadingGenre) {
    return <div>loading...</div>
  }
  if (errorBooks) {
    return <div>Error fetching books: {errorBooks.message} </div>
  }
  if (errorGenre) {
    return <div>Error fetching favorite genre: {errorGenre.message} </div>
  }
  if (!dataBooks) return <div>No data yet...</div>

  return (
    <div>
      <h2>recommendations</h2>
      {dataGenre && dataGenre.me && <div>Users favourite Genre: {dataGenre.me.favoriteGenre}</div>}

      {dataBooks?.allBooks?.length === 0 ? (
        <p>No books available in this genre.</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {dataBooks.allBooks.map(book => (
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
