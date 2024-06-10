import { gql } from '@apollo/client'

export const USER_FAVOURITE_GENRE = gql`
  query Me {
    me {
      favoriteGenre
      username
    }
  }
`

