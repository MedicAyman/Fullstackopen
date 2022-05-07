const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

// Get all blogs
blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

// find blog by ID
blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) res.json(blog);
      else res.status(404);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (req, res, next) => {
  const body = req.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
  });

  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog);
    })
    .catch((error) => {
      next(error);
    });
});

blogsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (req, res, next) => {
  const body = req.body;
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
