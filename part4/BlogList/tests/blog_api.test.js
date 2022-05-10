const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const _ = require("lodash");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
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

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await helper.blogsInDb();
    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);
    const titles = blogsAfterDeletion.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

// describe("update a blog", () => {
//   test("update amount of likes for a blog", async () => {
//     const initialBlogs = await helper.blogsInDb();
//     console.log(initialBlogs);
//     let updatedBlogs = { ...initialBlogs };
//     updatedBlogs[0].likes = 100;
//     let x = updatedBlogs[0];
//     console.log(x.id);
//     await api
//       .put(`/api/blogs/${updatedBlogs[0].id}`)
//       .send(x)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     const blogsAfterUpdate = await helper.blogsInDb();
//     const firstBlogAfterUpdate = blogsAfterUpdate.find(
//       (blog) => blog.title === updatedBlogs[0].title
//     );
//     console.log("firstBlogAfterUpdate", firstBlogAfterUpdate);
//     expect(firstBlogAfterUpdate.likes).toEqual(100);
//   });
// });

describe("update a blog using PUT", () => {
  test("update amoutof likes", async () => {
    const initialBlogs = await helper.blogsInDb();
    const newBlogLikes = {
      likes: "100",
    };
    const updatedBlog = await api
      .put(`/api/blogs/${initialBlogs[0].id.toString()}`)
      .send(newBlogLikes)
      .expect(200);
    expect(updatedBlog.body.likes).toBe(newBlogLikes.likes);
  });
});

describe("test user validation", () => {
  test("check that invalid user is not persisted", async () => {
    const invalidUser_Required = {
      username: "",
      name: "hello",
      password: "lololol",
    };
    await api.post("/api/users").send(invalidUser_Required).expect(400);
    const invalidUser_unique = {
      username: "root",
      name: "HEYOO",
      password: "salainen",
    };
    await api.post("/api/users").send(invalidUser_unique).expect(400);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
