const listHelper = require('../utils/list_helper')


const {
  emptyList,
  listWithOneBlog,
  listWithMultipleBlogs,
  listWithBlogsMissingValues,
} = require('./blogsTestingData');




test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


// Counts total likes of all blog posts
describe("total likes", () => {

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(24)
  })


  test("of a list with missing values / empty objects", () => {
    const result = listHelper.totalLikes(listWithBlogsMissingValues)
    expect(result).toBe(12)
  })

} )


// Finds the blog with the most likes
describe("favourite blog", () => {

  test("of empty list is zero", () => {
    const result = listHelper.favouriteBlog(emptyList)
    expect(result).toBe("No blogs found")
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test("of a bigger list is find and return the blog with most likes", () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })

  test("of a list with missing values / empty objects", () => {
    const result = listHelper.favouriteBlog(listWithBlogsMissingValues)
    expect(result).toEqual(
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7
      }
    )
  })

} )


