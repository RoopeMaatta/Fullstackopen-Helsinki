import { Link } from 'react-router-dom'
import UserTable from '../components/UserTable'
{
  /* <Link style={padding} to='/'>
        Userlink placeholder
      </Link> */
}

const UsersPage = () => {

  return (
    <>
      <h3>Users</h3>
      <UserTable />
    </>
  )
}

export default UsersPage
