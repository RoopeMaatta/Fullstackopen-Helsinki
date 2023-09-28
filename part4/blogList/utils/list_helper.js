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







module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}

