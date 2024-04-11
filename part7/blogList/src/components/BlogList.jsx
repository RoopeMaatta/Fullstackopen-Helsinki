import React, { useState, useEffect, useContext, useImperativeHandle } from 'react'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import Blog from './Blog'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const { user, loading } = useContext(UserAuthenticationContext)

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  //const { user, blogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const { resources: blogs, isLoading, isError, error } = useResources(baseUrl, user?.token)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderColor: 'lightgrey',
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.likes}</Link>
            </div>
          ))}
    </div>
  )
}

export default BlogList
