const blogsRouter = require("express").Router()
const { request, response } = require("../app");
const Blog = require ("../models/blog")
const User = require('../models/user')

// const middleware = require('../utils/middleware')
const { userExtractor } = require('../utils/middleware')

const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const userId = request.user.id; // or whatever property you've set in userExtractor

  try {
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    // Create the blog with a reference to the user's ID
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    });

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



blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {

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