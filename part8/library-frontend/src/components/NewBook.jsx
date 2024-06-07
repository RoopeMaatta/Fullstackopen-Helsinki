import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../graphql/booksQl'
import { ALL_BOOKS } from '../graphql/booksQl'
import { ALL_AUTHORS } from '../graphql/authorsQl'

const NewBook = props => {
  const [title, setTitle] = useState('WufBookTitle')
  const [author, setAuthor] = useState('AuthorName2')
  const [published, setPublished] = useState('2269')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      const newBook = response.data.addBook

      // Update the cache for the ALL_BOOKS query
      cache.updateQuery({ query: ALL_BOOKS, variables: { genre: '' } }, data => {
        return {
          allBooks: data.allBooks.concat(newBook),
        }
      })

      // Update the cache for genre-specific ALL_BOOKS queries
      newBook.genres.forEach(genre => {
        try {
          cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, data => {
            return {
              allBooks: data.allBooks.concat(newBook),
            }
          })
        } catch (e) {
          // Ignore if no query for that genre was made
        }
      })
    },
  })

  const submit = async event => {
    event.preventDefault()

    const publishedInt = parseInt(published, 10)
    createBook({
      variables: {
        title,
        author,
        published: publishedInt,
        genres,
      },
    })

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
