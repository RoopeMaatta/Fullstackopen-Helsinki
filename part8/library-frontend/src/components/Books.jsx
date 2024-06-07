import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/booksQl'
import { useState } from 'react'

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  if (books.loading) {
    return <div>loading...</div>
  }
  if (books.error) {
    return <div>Error: {books.error.message} </div>
  }

  // Extract unique genres, excluding books without genres or empty genre arrays
  const allGenres = books.data.allBooks
    .reduce((acc, book) => {
      if (book.genres && book.genres.length > 0) {
        book.genres.forEach(genre => {
          if (!acc.includes(genre)) {
            acc.push(genre)
          }
        })
      }
      return acc
    }, [])
    .sort() // Sort genres alphabetically

  // Filter books by the selected genre
  const filteredBooks = selectedGenre
    ? books.data.allBooks.filter(book => book.genres.includes(selectedGenre))
    : books.data.allBooks

  // Styles object for buttons
  const styles = {
    button: {
      marginRight: '10px',
      padding: '5px 10px',
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
    },
    activeButton: {
      backgroundColor: '#ccc',
    },
  }

  return (
    <div>
      <h2>books</h2>

      <label htmlFor='genre-select'>Filter by Genre:</label>
      <div>
        <button
          onClick={() => setSelectedGenre('')}
          style={{
            ...styles.button,
            ...(selectedGenre === '' ? styles.activeButton : {}),
          }}
        >
          All Genres
        </button>
        {allGenres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{
              ...styles.button,
              ...(selectedGenre === genre ? styles.activeButton : {}),
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
