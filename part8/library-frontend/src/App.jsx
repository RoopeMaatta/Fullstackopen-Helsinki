import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
//import client from './main'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  //const navigate = useNavigate()

  useEffect(() => {
    console.log('WUUUUFWUUUUFWUUUUFWUUUUF')
    const storedToken = localStorage.getItem('token')
    console.log('Retrieved Token on App Load:', storedToken)
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
              <button onClick={logout}>logout</button>

              <Link to='/add'>
                <button>add book</button>
              </Link>
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
        </Routes>
      </div>
    </Router>
  )
}

export default App
