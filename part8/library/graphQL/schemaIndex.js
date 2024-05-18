const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const authorBookGraphQL = require('./authorBookGraphQL')
const userGraphQL = require('./userGraphQL')

const typeDefs = mergeTypeDefs([authorBookGraphQL.typeDefs, userGraphQL.typeDefs])
const resolvers = mergeResolvers([authorBookGraphQL.resolvers, userGraphQL.resolvers])

module.exports = { typeDefs, resolvers }
