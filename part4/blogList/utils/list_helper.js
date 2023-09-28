const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs
    .filter(blog => blog.hasOwnProperty('likes') && blog.likes !== undefined)
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)
}


// // throws error if blogs has a element without likes property
// const totalLikes = (blogs) => {

//   return blogs.length === 0
//     ? 0
//     : blogs.map(blog => blog.likes).reduce((a,b) => a+b)
// }










module.exports = {
  dummy,
  totalLikes
}

