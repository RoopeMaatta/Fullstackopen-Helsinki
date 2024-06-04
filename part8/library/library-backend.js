const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { typeDefs, resolvers } = require('./graphQL/schemaIndex')
const User = require('./models/userSchema')

mongoose.set('strictQuery', false)

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
  playground: true, // Enable GraphQL Playground
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    // console.log('Headers:', req.headers) // Log headers
    const auth = req ? req.headers.authorization : null
    const operation = req.body.operationName

    // Allow unauthenticated access for introspection queries
    if (operation && operation.startsWith('__')) {
      return {} // Return an empty context for introspection queries
    }

    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (error) {
        console.error('Error verifying JWT:', error)
        throw new Error('Authentication failed')
      }
    }
    return {}
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
