import Blog from '../components/Blog'
import { useParams, useNavigate } from 'react-router-dom'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import React, { useContext, useState } from 'react'
import { useResources } from '../hooks/useResources'
import { useNotificationContext } from '../NotificationContext'
import InputField from '../components/InputField'

const BlogDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useContext(UserAuthenticationContext)
  const baseUrl =
    'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs/'
  const { showNotification } = useNotificationContext()
  const {
    resources: blog,
    isLoading,
    isError,
    error,
    update,
    delete: deleteBlog,
  } = useResources(baseUrl, user?.token, id)
  const [comment, setComment] = useState('')

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newComment = { text: comment }
      await update(
        {
          id: blog.id,
          data: { comments: [...blog.comments, newComment] },
        },
        {
          onSuccess: (updatedBlog) => {
            console.log(updatedBlog)
            showNotification(`Comment added to blog: ${updatedBlog.title}`)
          },
          onError: (error) => {
            showNotification(
              `Something went wrong with commenting on blog: ${error.message}`,
              'error'
            )
          },
        }
      )
    } catch (exception) {
      showNotification('Something went wrong with commenting on blog', 'error')
    }
    setComment('')
  }

  const handleLike = (blog) => {
    update(
      {
        id: blog.id,
        data: { likes: blog.likes + 1 },
      },
      {
        onSuccess: (updatedBlog) => {
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
          navigate(-1)
        },
        onError: (error) => {
          showNotification(`Something went wrong with deleting a blog: ${error.message}`, 'error')
        },
      })
    } else {
      showNotification('Deleting aborted')
    }
  }

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
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Add comment'
          id='comment'
          type='text'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
          placeholder='comment'
        />

        <button id='comment-button' type='submit'>
          Add Comment
        </button>
      </form>

      <ul>
        {blog.comments && blog.comments.map((comment) => <li key={comment._id}>{comment.text}</li>)}
      </ul>
    </>
  )
}

export default BlogDetailPage
