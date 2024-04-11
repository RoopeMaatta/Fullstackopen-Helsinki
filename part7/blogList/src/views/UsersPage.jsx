import { Link } from 'react-router-dom'
import UserList from '../components/UserTable'
{
  /* <Link style={padding} to='/'>
        Userlink placeholder
      </Link> */
}

const UsersPage = () => {

  return (
    <>
      <h3>Users</h3>
      <UserList />
    </>
  )
}

export default UsersPage
