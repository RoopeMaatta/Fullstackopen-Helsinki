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
    likes: 3,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: "Mister Nekkonen",
    url: "www.Miumau.fi/bonks",
    likes: 6
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

test("a valid new blog can be added", async () => {
  const newBlog = {
    title: "how to bork during a new dawn",
    author: "Le Kitsumon",
    url: "www.newblog.us",
    likes: 5,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get("/api/blogs")
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(titles).toContain("how to bork during a new dawn")

})


test("if 'likes'-property is missing and it will be set to 0", async () => {
  const newBlog = {
    title: "How to miss liking bones",
    author: "el Doggo",
    url: "www.sendbones.us",
    // likes is missing and should be set to 0
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)



  const response = await api.get('/api/blogs')

  const likesAll = response.body.map(r => r.likes)

  expect(likesAll.every(like => typeof like === "number")).toBeTruthy()
  expect(likesAll.filter(like => like === 0)).toHaveLength(1)
})


test("if creating blog with missing 'title' responds with status 400 Bad Request", async () => {
  const newBlogWithoutTitle = {
    // title is missing
    author: "el Doggo",
    url: "www.sendusbones.us",
    likes: 6
  }

  await api
    .post("/api/blogs")
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
});


test("if creating blog with missing 'url' responds with status 400 Bad Request", async () => {
  const newBlogWithoutUrl = {
    title: "This is the story of my liver",
    author: "el Doggo",
    // url is missing
    likes: 6
  }

  await api
    .post("/api/blogs")
    .send(newBlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
});
