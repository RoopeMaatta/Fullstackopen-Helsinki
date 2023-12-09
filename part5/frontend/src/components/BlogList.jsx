import React, { useState, useEffect, useContext } from 'react'
import blogService from '../services/blogs'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import Togglable from './Togglable'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const { user, blogUpdate, showNotification } = useContext(UserAuthenticationContext)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
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
          {blog.title} by {blog.author}
          <Togglable buttonLabel="Show Details">
            <ul>
              <li>Title: {blog.title}</li>
              <li>Url: {blog.url}</li>
              <li>Likes: {blog.likes} <button onClick={ () => handleLike(blog)}>Like</button></li>
              <li>Author: {blog.author}</li>
            </ul>
          </Togglable>
        </div>
      ))}
    </div>
  )
}

export default BlogList
