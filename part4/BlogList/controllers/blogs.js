const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

// Get all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
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
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
  });

  let savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
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
