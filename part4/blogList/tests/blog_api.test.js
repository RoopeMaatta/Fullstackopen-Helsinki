const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Initial database setup //

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "Sir Wuffelius",
    url: "www.Awuuh.com/blogs",
    likes: "3",
  },
  {
    title: 'Browser can execute only JavaScript',
    author: "Mister Nekkonen",
    url: "www.Miumau.fi/bonks",
    likes: "69",
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


// TESTS //


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


test('a spesific blog is within returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Browser can execute only JavaScript')


})

test('all blogs have "id" property', async () => {
  const response = await api.get('/api/blogs')

  const allHaveId = response.body.every(obj => obj.id !== undefined);

  expect(allHaveId).toBe(true);


})