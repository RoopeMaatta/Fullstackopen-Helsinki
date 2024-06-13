import { gql } from '@apollo/client'


const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookFields
    }
  }
  ${BOOK_FIELDS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookFields
    }
  }
  ${BOOK_FIELDS}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookFields
    }
  }
  ${BOOK_FIELDS}
`
