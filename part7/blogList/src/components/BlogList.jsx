import React, { useState, useEffect, useContext, useImperativeHandle } from 'react'
import blogService from '../services/blogs'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import Blog from './Blog'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'

const BlogList = () => {
  const { user, loading } = useContext(UserAuthenticationContext)

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  //const { user, blogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const {
    resources: blogs,
    isLoading,
    isError,
    error,
    update,
    delete: deleteBlog,
  } = useResources(baseUrl, user?.token)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  const handleLike = (blog) => {
    update({
      id: blog.id,
      data: { ...blog, likes: blog.likes + 1 }
    }, {
      onSuccess: (updatedBlog) => {
        console.log(updatedBlog)
        showNotification(`+1 Like to blog: ${updatedBlog.title}`)
      },
      onError: (error) => {
        showNotification(`Something went wrong with liking a blog: ${error.message}`, 'error')
      }
    })
  }

  const handleDeleteConfirmation = (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete blog: ${blogTitle}?`)) {
      deleteBlog(blogId, {
        onSuccess: () => {
          showNotification(`${blogTitle} was deleted`)
        },
        onError: (error) => {
          showNotification(`Something went wrong with deleting a blog: ${error.message}`, 'error')
        }
      })
    } else {
      showNotification('Deleting aborted')
    }
  }

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
      {blogs && blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Blog
            blog={{
              ...blog,
              authorId: blog.user?.id, // Assuming 'user' exists and has an 'id'
            }}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDeleteConfirmation(blog.id, blog.title)}
          />
        </div>
      ))}
    </div>
  )
}

export default BlogList
