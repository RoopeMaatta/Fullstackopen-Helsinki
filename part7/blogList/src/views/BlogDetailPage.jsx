import Blog from '../components/Blog'
import { useParams, useNavigate } from 'react-router-dom'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import React, { useContext } from 'react'
import { useResources } from '../hooks/useResources'
import { useNotificationContext } from '../NotificationContext'


const BlogDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useContext(UserAuthenticationContext)
  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs/'
  const { showNotification } = useNotificationContext()
  const {
    resources: blog,
    isLoading,
    isError,
    error,
    update,
    delete: deleteBlog,
  } = useResources(baseUrl, user?.token, id)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  const handleLike = (blog) => {
    update(
      {
        id: blog.id,
        data: { ...blog, likes: blog.likes + 1 },
      },
      {
        onSuccess: (updatedBlog) => {
          console.log(updatedBlog)
          showNotification(`+1 Like to blog: ${updatedBlog.title}`)
        },
        onError: (error) => {
          showNotification(`Something went wrong with liking a blog: ${error.message}`, 'error')
        },
      }
    )
  }

  const handleDeleteConfirmation = (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete blog: ${blogTitle}?`)) {
      deleteBlog(blogId, {
        onSuccess: () => {
          showNotification(`${blogTitle} was deleted`)
          navigate('/')
        },
        onError: (error) => {
          showNotification(`Something went wrong with deleting a blog: ${error.message}`, 'error')
        },
      })
    } else {
      showNotification('Deleting aborted')
    }
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  return (
    <>
      <h3>Blog Details</h3>
      <Blog
        blog={{
          ...blog,
          authorId: blog.user?.id, // Assuming 'user' exists and has an 'id'
        }}
        handleLike={() => handleLike(blog)}
        handleDelete={() => handleDeleteConfirmation(blog.id, blog.title)}
      />
    </>
  )
}

export default BlogDetailPage
