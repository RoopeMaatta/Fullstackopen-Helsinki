import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './graphql/booksQl'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const title = data.data.bookAdded.title
      window.alert(`New book added: ${title}`)
    },
  })
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    client.resetStore()
    //navigate('/login')
  }
  return (
    <Router>
      <div>
        <nav>
          <Link to='/authors'>
            <button>authors</button>
          </Link>
          <Link to='/books'>
            <button>books</button>
          </Link>

          {token ? (
            <>
              <Link to='/add'>
                <button>add book</button>
              </Link>
              <Link to='/recommendations'>
                <button>recomended</button>
              </Link>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <Link to='/login'>
              <button>login</button>
            </Link>
          )}
        </nav>

        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/add' element={<NewBook />} />
          <Route path='/recommendations' element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
