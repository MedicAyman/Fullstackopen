const totalLikes = (blogs) => {
  let likes = blogs.reduce((total, blog) => total + blog.likes, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  let highest_amount_of_likes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === highest_amount_of_likes);
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
