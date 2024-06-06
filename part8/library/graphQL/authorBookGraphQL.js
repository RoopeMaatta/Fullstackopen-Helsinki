const { GraphQLError } = require('graphql')
const Author = require('../models/authorSchema')
const Book = require('../models/bookSchema')

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
  Book: {
    author: async book => {
      return await Author.findById(book.author)
    },
  },
  Author: {
    bookCount: async author => {
      try {
        return await Book.countDocuments({ author: author._id })
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
        return await Book.countDocuments()
      } catch (error) {
        console.error('Error fetching book count:', error)
        throw new GraphQLError('Failed to fetch book count', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
    authorCount: async () => {
      try {
        return await Author.countDocuments()
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
          if (author) query.author = author._id
        }
        if (args.genre) query.genres = { $in: [args.genre] }
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
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You need to be logged in to perform this action')
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, born: null })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()
        return book.populate('author')
      } catch (error) {
        console.error('Error adding book:', error)
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Invalid input', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: error.errors },
          })
        }
        throw new GraphQLError(`Failed to add book due to error: ${error.message}`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You need to be logged in to perform this action')
      }
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true, runValidators: true }
        )
        if (!updatedAuthor) {
          throw new GraphQLError('No author found with the provided name', {
            extensions: { code: 'NOT_FOUND', invalidArgs: args.name },
          })
        }
        return updatedAuthor
      } catch (error) {
        console.error('Error editing author:', error)
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Invalid input', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: error.errors },
          })
        }
        throw new GraphQLError('Error editing author', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', error },
        })
      }
    },
  },
}

module.exports = { typeDefs, resolvers }
