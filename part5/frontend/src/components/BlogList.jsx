import React, { useState, useEffect, useContext, useImperativeHandle } from 'react'
import blogService from '../services/blogs'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import Blog from './Blog'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const { user, blogUpdate, showNotification } = useContext(UserAuthenticationContext)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
        //console.log('blogs0.user:', blogs[0].user)
        //console.log('blogs0.user.id:', blogs[0].user.id)
      })
      .catch(error => {
        console.error('Error fetching blogs:', error)
      })
  }, [user, blogUpdate])

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      // Update the state or handle the updated blog data
      showNotification(`+1 Like to blog: ${updatedBlog.title}`)
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch (exception) {
      showNotification('Something went wrong with liking a blog', 'error')
      // Handle error (e.g., show a notification)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you shure you want to delete blog: ${blog.title}`)){
      try {
        const deleteBlog = await blogService.remove(blog.id)
        // Update the state or handle the updated blog data
        showNotification(`${blog.title} was deleted`)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        showNotification('Something went wrong with deleting a blog', 'error')
      // Handle error (e.g., show a notification)
      }
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

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} style = {blogStyle}>
          <Blog
            blog = {{
              title: blog.title,
              url: blog.url,
              likes: blog.likes,
              author: blog.author,
              id: blog.id,
              authorId: blog.user.id
            }}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  )
}

export default BlogList
