import { useState } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <div>
      <h2>blogs</h2>

      {user === null 
        ? <LoginForm onLogin={handleLogin} />
        : (
            <>
            <div> {user.name} is logged in </div>
            <br />
            <BlogList />
            </>
          )
      }
    
    </div>
  )
}

export default App


