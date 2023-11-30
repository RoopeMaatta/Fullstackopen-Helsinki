const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {

  const { username, name, password } = request.body



  if (!password) {
    return response.status(400).json({
      error: 'Password is required.'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password must be at least 3 characters long.'
    })
  }



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message })
    } else {
      next(error)
    }
  }

})


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate("blogs", { url: 1, title: 1, author: 1 })
  response.json(users)
})


module.exports = usersRouter