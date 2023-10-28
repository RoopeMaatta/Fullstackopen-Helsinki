const blogsRouter = require("express").Router()
const { request, response } = require("../app");
const Blog = require ("../models/blog")

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})


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