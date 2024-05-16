const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { UniqueDirectiveNamesRule } = require('graphql')
const { argsToArgsConfig } = require('graphql/type/definition')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/authorSchema')
const Book = require('./models/bookSchema')
const { GraphQLError } = require('graphql')

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

////////////////////////////////////

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

  } 
`

const resolvers = {
  Author: {
    bookCount: async author => {
      try {
        const count = await Book.countDocuments({ author: author._id })
        return count
      } catch (error) {
        console.error('Error calculating book count for author:', error)
        throw new GraphQLError('Failed to calculate book count', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
  },
  Query: {
    bookCount: async () => {
      try {
        const count = await Book.countDocuments()
        return count
      } catch (error) {
        console.error('Error fetching book count:', error)
        throw new GraphQLError('Failed to fetch book count', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
    authorCount: async () => {
      try {
        const count = await Author.countDocuments()
        return count
      } catch (error) {
        console.error('Error fetching author count:', error)
        throw new GraphQLError('Failed to fetch author count', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
    allBooks: async (root, args) => {
      try {
        let query = {}

        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (author) {
            query.author = author._id
          }
        }

        if (args.genre) {
          query.genres = { $in: [args.genre] }
        }

        return await Book.find(query).populate('author')
      } catch (error) {
        console.error('Error fetching books:', error)
        throw new GraphQLError('Failed to fetch books', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },

    allAuthors: async () => {
      try {
        return await Author.aggregate([
          // Left outer join books to author
          {
            $lookup: {
              from: 'books',
              localField: '_id',
              foreignField: 'author',
              as: 'books',
            },
          },
          {
            $project: {
              name: 1,
              id: '$_id',
              born: 1,
              bookCount: { $size: '$books' },
            },
          },
        ])
      } catch (error) {
        console.error('Error fetching authors:', error)
        throw new GraphQLError('Failed to fetch authors', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        })
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
          })
          await author.save()
        }

        const book = new Book({
          ...args,
          author: author._id,
        })
        await book.save()
        return book
      } catch (error) {
        console.error('Error adding book:', error)

        // Check if error is a validation error
        if (error.name === 'ValidationError') {
          // Provide detailed validation error information
          throw new GraphQLError('Invalid input', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: error.errors, // Detailed error information
            },
          })
        }

        throw new GraphQLError(`Failed to add book due to error: ${error.message}`, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            invalidArgs: args,
            error,
          },
        })
      }
    },

    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true, runValidators: true }
        )
        if (!updatedAuthor) {
          console.log('No author found with the provided name.')
          throw new GraphQLError('No author found with the provided name', {
            extensions: {
              code: 'NOT_FOUND',
              invalidArgs: args.name,
            },
          })
        }
        return updatedAuthor
      } catch (error) {
        console.error('Error editing author:', error)

        // Check if error is a validation error
        if (error.name === 'ValidationError') {
          // Provide detailed validation error information
          throw new GraphQLError('Invalid input', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: error.errors, // Detailed error information
            },
          })
        }

        throw new GraphQLError('Error editing author', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        })
      }
    },
  },
}

//////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
