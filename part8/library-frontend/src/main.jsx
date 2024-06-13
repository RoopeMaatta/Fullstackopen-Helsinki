import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

// Middleware that adds the necessary headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
      'content-type': 'application/json',
      'Apollo-Require-Preflight': 'true',
      //'x-apollo-operation-name': 'ApolloOperation', // Custom header to bypass CSRF protection if needed
    },
  }
})

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/',
  uri: 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-4000.app.github.dev/',
})

const wsLink = new GraphQLWsLink(
  createClient({
    //url: 'ws://localhost:4000',
    url: 'wss://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-4000.app.github.dev/',
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
)
