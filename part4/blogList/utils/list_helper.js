const dummy = (blogs) => {
  return 1
}

// Counts total likes of all blog posts
const totalLikes = (blogs) => {
  return blogs
    .filter(blog => blog.hasOwnProperty('likes') && blog.likes !== undefined) // filters away objects that do not have like property
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)
}




// Finds the blog with the most likes
const favouriteBlog = (blogs) => {
  const mostLikesOnBlog = Math.max(
    ...blogs //converts array of numvers into individual numers for math.max
      .filter(blog => blog.hasOwnProperty('likes') && blog.likes !== undefined)
      .map(blog => blog.likes)
  );

  const blogWithMostLikes = blogs
    .find(blog => blog.likes === mostLikesOnBlog);

  if (!blogWithMostLikes || blogs.length === 0) {
    return "No blogs found";
  }

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  };
}



// Group array by author and return a object with authors as keys
const groupByAuthor = (blogs) => {
  return blogs.reduce((acc, currentBlog) => {
  // check id the accumulator object does not have aproperty with the name of current author
    if(!acc[currentBlog.author]) {
      acc[currentBlog.author] = [];
    }

    // Add the blog to the authors object
    acc[currentBlog.author].push(currentBlog)
    return acc
  }, {})
}


// find the author with the most blogs
const mostBlogs = (blogs) => {

  const groupedByAuthor = groupByAuthor(blogs)

  let mostBlogsAuthor = ""
  let mostBlogsCount = 0


  for (let author in groupedByAuthor) {
    if (groupedByAuthor[author].length > mostBlogsCount) {
      mostBlogsAuthor = author
      mostBlogsCount = groupedByAuthor[author].length
    }
  }
  return {
    author: mostBlogsAuthor,
    blogs: mostBlogsCount
  }
}

// find the author with the most likes
const mostLikes = (allBlogs) => {
  const groupedByAuthor = groupByAuthor(allBlogs)

  return Object.entries(groupedByAuthor).reduce((currentAuthorWithMostLikes, [author, blogs]) => {
    const authorTotalLikes = blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)

    return authorTotalLikes > currentAuthorWithMostLikes.likes
      ? { author, likes: authorTotalLikes }
      : currentAuthorWithMostLikes

  }, { author: "", likes: 0 })

}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  groupByAuthor,
  mostLikes,
}

