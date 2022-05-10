const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
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

blogsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  const body = req.body;
  logger.info("TOKEN", req.token);
  const user = req.user;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: req.user.id,
  });

  const savedBlog = await blog.save();
  //const user = await User.findById(req.user.id);
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const blog = Blog.findById(req.params.id);
  logger.info();
  if (blog.user === decodedToken.id)
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
