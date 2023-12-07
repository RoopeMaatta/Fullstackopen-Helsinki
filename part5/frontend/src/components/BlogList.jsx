import React, { useState, useEffect, useContext } from 'react'
import blogService from '../services/blogs'
import { UserAuthenticationContext } from '../hooks/useAuthentication';

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const { user, blogUpdate } = useContext(UserAuthenticationContext);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [user, blogUpdate])

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