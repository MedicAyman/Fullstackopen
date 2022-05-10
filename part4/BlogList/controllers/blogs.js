const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// Get all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

// find blog by ID
blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) return res.json(blog);
  else res.status(404).send();
});

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const token = await req.token;
  logger.info("TOKEN: ", req.token);
  const decodedToken = await jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id)
    // if decodedToken.id === undefined
    return response.status(401).json({ error: "token missing or invalid" });

  const user = await User.findById(decodedToken.id);
  console.log(user);
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: user.id,
  });

  let savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const blog = Blog.findById(req.params.id);
  if (blog.user.toString() === decodedToken.id)
    await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
