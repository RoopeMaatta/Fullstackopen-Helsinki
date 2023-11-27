const blogsRouter = require("express").Router()
const { request, response } = require("../app");
const Blog = require ("../models/blog")
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}



blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', async (request, response, next) => {
  const { userId, title, author, url, likes } = request.body;


  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  // Create the blog with a reference to the user's ID
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();

    // Update the user's `blogs` array with the new blog's ID
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    // Populate user details in the saved blog before sending the response
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user');

    response.status(201).json(populatedBlog);
  } catch (error) {
    next(error);
  }
});



blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter