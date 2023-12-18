import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {


  return (
    <div>
      <div>{blog.title} by {blog.author}</div>
      <Togglable buttonLabel="Show Details">
        <ul>
          <li>Title: {blog.title}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={ () => handleLike(blog)}>Like</button></li>
          <li>Author: {blog.author}</li>
          <button onClick={ () => handleDelete(blog)}>Delete blog</button>
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

