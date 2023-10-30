const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Initial testing database setup //

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


// Store the saved blog instances in this array
let savedBlogs = [];

beforeEach(async () => {
  await Blog.deleteMany({});

  savedBlogs = []; // Clear the array

  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog);
    const savedBlog = await blogObject.save();
    savedBlogs.push(savedBlog); // Store each saved blog instance
  }
});


afterAll(async () => {
  await mongoose.connection.close()
})

// TESTS //


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
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


test("deleting a blog", async () => {
  const blogToBeDeleted = savedBlogs[0]

  await api
    .delete(`/api/blogs/${blogToBeDeleted.id}`)
    .expect(204)

  // Additional assertion to ensure it's actually deleted
  const blogsAfterDeletion = await Blog.find({});
  const titles = blogsAfterDeletion.map(blog => blog.title);
  expect(titles).not.toContain("HTML is easy");
})


test("updating a blog", async () => {
  const blogToBeUpdated = savedBlogs[0]

  const updatedData = {
    title: "This be updated title",
    url: "www.new.us",
    likes: 3,
  };

  const response = await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(updatedData)
    .expect(200)

  // Validate that the response has the updated data
  expect(response.body.title).toEqual(updatedData.title);
  expect(response.body.url).toEqual(updatedData.url);
  expect(response.body.likes).toEqual(updatedData.likes);

  // Fetch the updated blog from the database and validate the updates
  const updatedBlog = await Blog.findById(blogToBeUpdated.id);
  expect(updatedBlog.title).toEqual(updatedData.title);
  expect(updatedBlog.url).toEqual(updatedData.url);
  expect(updatedBlog.likes).toEqual(updatedData.likes);

})