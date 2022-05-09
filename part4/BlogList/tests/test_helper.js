const Blog = require("../models/blog");

const initialBlogs = [
  {
    author: "John Doe",
    title: "First post",
    url: "wwww.google.com",
    likes: "10",
  },
  {
    author: "Amber heard",
    title: "How to fake violance",
    url: "wwww.washingtonpost.com",
    likes: "0",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogAtEnd = (blogs) => {};
module.exports = {
  initialBlogs,
  blogsInDb,
};
