const { transform } = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
const helper = require("./test_helper");
const _ = require("lodash");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 100000);

describe("get all blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("check if blog has property id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("add a blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      author: "Depp",
      title: "Fuck the Op-ed",
      url: "www.youtube.com",
      likes: "100",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const persistedBlogs = await helper.blogsInDb();

    expect(persistedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const contents = persistedBlogs.map((n) => n.title);
    expect(contents).toContain("Fuck the Op-ed");
  });
  test("likes property is NOT missing from the request default to 0", async () => {
    const newBlog = {
      author: "Depp",
      title: "Fuck the Op-ed",
      url: "www.youtube.com",
    };
    const persistedNewBlog = await api.post("/api/blogs").send(newBlog);

    expect(persistedNewBlog.body.likes).toEqual("0");
  });

  test("title and url properties are present when new blog is posted", async () => {
    const newBlog = {
      author: "Depp",
    };
    const persistedNewBlog = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
});

describe("delete blog", () => {
  test("returns correct status code when a correct id is given", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0];
    console.log(blogToDelete);
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await helper.blogsInDb();
    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);
    const titles = blogsAfterDeletion.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
