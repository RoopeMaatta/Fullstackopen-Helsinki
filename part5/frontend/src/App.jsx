// import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useUserAuthentication, UserAuthenticationContext } from './hooks/useUserAuthentication';



const App = () => {
  const { user, handleLogin, handleLogout } = useUserAuthentication();

  return (
    <UserAuthenticationContext.Provider value={{ user, handleLogout }}>
      <div>
        <h2>blogs</h2>
        {user === null ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <div>{user.name} is logged in</div>
            <button onClick={handleLogout}>Logout</button>
            <br />
            <BlogList />
          </>
        )}
      </div>
    </UserAuthenticationContext.Provider>
  );
};

export default App;


// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//     }
//   }, [])

//   const handleLogin = (user) => {
//     window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
//     setUser(user);
//   };

//   const handleLogout = () => {
//     window.localStorage.removeItem('loggedAppUser');
//     setUser(null);
//   };

//   return (
//     <div>
//       <h2>blogs</h2>

//       {user === null 
//         ? <LoginForm onLogin={handleLogin} />
//         : (
//             <>
//             <div> {user.name} is logged in </div>
//             <button onClick={handleLogout}>Logout</button>
//             <br />
//             <BlogList />
//             </>
//           )
//       }
    
//     </div>
//   )
// }

// export default App


