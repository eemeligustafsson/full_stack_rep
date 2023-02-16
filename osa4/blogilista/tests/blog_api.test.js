const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("initially some blogs in db", () => {
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
});

describe("adding a new blog", () => {
  let header;

  beforeEach(async () => {
    const testUser = {
      username: "tester",
      name: "tester",
      password: "kissa1234",
    };
    await api.post("/api/users").send(testUser);
    const result = await api.post("/api/login").send(testUser);

    header = { Authorization: `Bearer ${result.body.token}` };
  });
  test("blogs can be added through /api/blogs post method", async () => {
    const blog = {
      title: "random patterns",
      author: "eemeli",
      url: "https://reactpatterns.com/",
      likes: 50,
    };
    await api
      .post("/api/blogs")
      .set(header)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const content = blogsAtEnd.map((b) => b.title);
    expect(content).toContain("random patterns");
  });
  test("blog adding fails with code 401 if no token is provided", async () => {
    const blog = {
      title: "patterns",
      author: "eemeli",
      url: "https://reactpatterns.com/",
      likes: 20,
    };
    await api.post("/api/blogs").send(blog).expect(401);
  });
  test("blog creation fails with code 400 if fields title & or url are missing", async () => {
    const blog = {
      author: "emels",
      likes: 2,
    };
    await api.post("/api/blogs").send(blog).set(header).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test("default value for likes is 0", async () => {
    const blog = {
      title: "random patterns 0",
      author: "eemdd",
      url: "https://reactpatterns.com/",
    };
    await api.post("/api/blogs").set(header).send(blog).set(header).expect(201);
    const blogs = await helper.blogsInDb();
    expect(blogs[blogs.length - 1].likes).toBe(0);
  });
});

describe("blog deletion", () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("kissa1234", 10);
    const user = await new User({
      username: "tester",
      passwordHash: hashedPassword,
    }).save();

    const tokenUser = { username: "tester", id: user.id };
    token = jwt.sign(tokenUser, process.env.SECRET);

    const blog = {
      title: "test_blog",
      author: "tester",
      url: "www",
      likes: 31,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201);

    return token;
  });
  test("test for single blog deletion", async () => {
    const blog = {
      title: "random patterns 0",
      author: "eemdd",
      likes: 30,
      url: "https://reactpatterns.com/",
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    //const contents = blogsAtEnd.map(r => r.content);

    const contents = blogsAtEnd;
    expect(contents).not.toContain(blogToDelete.content);
  });
});

describe("blog modification", () => {
  let header;

  beforeEach(async () => {
    const testUser = {
      username: "tester",
      name: "tester",
      password: "kissa1234",
    };
    await api.post("/api/users").send(testUser);
    const result = await api.post("/api/login").send(testUser);

    header = { Authorization: `Bearer ${result.body.token}` };
  });
  test("test for single blog modification", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 70 })
      .set(header)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(updatedBlog.likes).toBe(70);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
