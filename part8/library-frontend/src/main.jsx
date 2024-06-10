import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/',
  uri: 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-4000.app.github.dev/',
})

// Middleware that adds the necessary headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  console.log('AuthLink Token:', token)

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

// Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Use the authLink to add headers to each request
  cache: new InMemoryCache(),
})


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
)
