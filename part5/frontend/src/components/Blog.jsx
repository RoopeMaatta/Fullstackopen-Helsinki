import React, { useContext } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { UserAuthenticationContext } from '../hooks/useAuthentication'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const { user: currentUser } = useContext(UserAuthenticationContext)
  //  const userCreatedBlog = blog && blog.user && currentUser && currentUser.id === blog.user.id

  const userCreatedBlog = blog.authorId === currentUser.id
  console.log('Blog made by logged in user:', userCreatedBlog)
  console.log('blog.authorId:', blog.authorId)
  console.log('currentUser.id:', currentUser.id)



  return (
    <div>
      <div>{blog.title} by {blog.author}</div>
      <Togglable buttonLabel="Show Details">
        <ul>
          <li>Title: {blog.title}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={ () => handleLike(blog)}>Like</button></li>
          <li>Author: {blog.author}</li>
          {userCreatedBlog && <button className="delete-blog" onClick={() => handleDelete(blog)}>Delete blog</button>}
        </ul>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog

