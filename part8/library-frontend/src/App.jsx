import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [page, setPage] = useState('authors')

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
          <Link to='/add'>
            <button>add book</button>
          </Link>
        </nav>

        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/add' element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
