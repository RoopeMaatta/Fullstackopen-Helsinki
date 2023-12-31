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
    expect(result).toBe(36)
  })


  test("of a list with missing values / empty objects", () => {
    const result = listHelper.totalLikes(listWithBlogsMissingValues)
    expect(result).toBe(12)
  })

} )


// Finds the blog with the most likes
describe("favourite blog", () => {

  test("of empty list message: No blogs found", () => {
    const result = listHelper.favouriteBlog(emptyList)
    expect(result).toBe("No blogs found")
  })

  test("when list has only one blog equals the likes of that blog", () => {
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

  test("of a list with missing values / empty objects ignore nonvalid data", () => {
    const result = listHelper.favouriteBlog(listWithBlogsMissingValues)
    expect(result).toEqual(
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7
      }
    )
  })

  // group array into a object by author
  describe("group by author", () => {
    test("from multiple blogs", () => {
      const result = listHelper.groupByAuthor(listWithMultipleBlogs)
      // console.log(listHelper.groupByAuthor(listWithMultipleBlogs))
      expect(result).toEqual(
        {
          "Michael Chan": [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
          ],
          "Edsger W. Dijkstra": [
            {
              _id: "5a422aa71b54a676234d17f8",
              title: "Go To Statement Considered Harmful",
              author: "Edsger W. Dijkstra",
              url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
              likes: 5,
              __v: 0
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            }
          ],
          "Robert C. Martin": [
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
              likes: 10,
              __v: 0
            },
            {
              _id: "5a422ba71b54a676234d17fb",
              title: "TDD harms architecture",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
              likes: 0,
              __v: 0
            },
            {
              _id: "5a422bc61b54a676234d17fc",
              title: "Type wars",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
              likes: 2,
              __v: 0
            }
          ]
        }

      )
    })
  })


  // Find the author with the most blogs
  describe("most blogs", () => {
    test("of multiple blogs", () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs)
      expect(result).toEqual(
        {
          author: "Robert C. Martin",
          blogs: 3
        }
      )
    })

    test("of empty list", () => {
      const result = listHelper.mostBlogs(emptyList)
      expect(result).toEqual(
        {
          author: "",
          blogs: 0
        }
      )
    })

    test("list with one Blog", () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(
        {
          author: "Edsger W. Dijkstra",
          blogs: 1
        }
      )
    })

  })

  // Find the author with most toal likes and count the likes together
  describe("Total likes", () => {
    test("of multiple blogs is calculated", () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs)
      expect(result).toEqual(
        {
          author: "Edsger W. Dijkstra",
          likes: 17
        }
      )
    })

    test("of empty list", () => {
      const result = listHelper.mostLikes(emptyList)
      expect(result).toEqual(
        {
          author: "",
          likes: 0
        }
      )
    })

    test("of list with one blog", () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(
        {
          author: "Edsger W. Dijkstra",
          likes: 5
        }
      )
    })

  })


} )


