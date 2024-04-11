import React, { useContext } from 'react'
import { UserAuthenticationContext } from '../hooks/useAuthentication'

import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UsersProfilePage = () => {
  const { user } = useContext(UserAuthenticationContext)
  const { id } = useParams()
  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  //const { user, blogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const { resources: blogs, isLoading, isError, error } = useResources(baseUrl, user?.token)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
  }

  const userBlogs = blogs.filter(blog => blog.user.id === id)
  const userProfileName = userBlogs[0]?.user

  return (
    <div>
      <h3>{userProfileName ? userProfileName.username : 'User'}</h3>
      <h4>Added Blogs</h4>
      <ul>
        {userBlogs &&
          userBlogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id} style={blogStyle}>
                {blog.title}
              </li>
            ))}
      </ul>
    </div>
  )
}

export default UsersProfilePage
