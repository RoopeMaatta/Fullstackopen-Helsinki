const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { UniqueDirectiveNamesRule } = require('graphql')
const { argsToArgsConfig } = require('graphql/type/definition')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/authorSchema')
const Book = require('./models/bookSchema')

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
      // Count documents where the 'author' field matches the current author's ID
      return Book.countDocuments({ author: author._id })
    },
  },
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
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

      return Book.find(query).populate('author')
    },

    allAuthors: async () => {
      return Author.aggregate([
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
        throw new Error(`Failed to add book due to error: ${error.message}`)
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
          return null
        }
        return updatedAuthor
      } catch (error) {
        console.error('Error editing author:', error)
        throw new Error('Error editing author')
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
