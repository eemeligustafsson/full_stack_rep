const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("currect number of blogs is returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs identified by id", async () => {
  const response = await api.get("/api/blogs");
  const fields = response.body.map((blog) => blog.id);

  for (const id of fields) {
    expect(id).toBeDefined();
  }
});

test("blogs can be added through /api/blogs post method", async () => {
  const blog = {
    title: "random patterns",
    author: "eemeli",
    url: "https://reactpatterns.com/",
  };
  const response1 = await api.get("/api/blogs");
  console.log(response1.body);
  await api.post("/api/blogs").send(blog);
  const response2 = await api.get("/api/blogs");
  console.log(response2.body);
  expect(response2.body).toHaveLength(response1.body.length + 1);
});

test("default value for likes is 0", async () => {
  const blog = {
    title: "random patterns 0",
    author: "eemdd",
    url: "https://reactpatterns.com/",
  };
  await api.post("/api/blogs").send(blog);
  const blogs = await helper.blogsInDb();
  expect(blogs[blogs.length - 1].likes).toBe(0);
});
test("test for missing title and url field", async () => {
  const blog = {
    title: "lool",
    author: "emels",
    likes: 2
  };
  await api
  .post("/api/blogs")
  .send(blog)
  .expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
});

afterAll(() => {
  mongoose.connection.close();
});
