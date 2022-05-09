const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: "salainen",
  },
  {
    username: "marvel",
    name: "strange",
    password: "doctor",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogAtEnd = (blogs) => {};
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUsers,
};
