import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} by {blog.author}
        </div>
      ))}
    </div>  
  )
}

export default BlogList