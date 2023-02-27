const blogsRouter = require("express").Router();
const { response, request } = require("../app");
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token is invalid" });
  }
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  if (typeof blog.title === "undefined" || typeof blog.url === "undefined") {
    return response
      .status(400)
      .json({ error: "missing title and url fields." });
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});
blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token is invalid" });
  }
  const user = request.user;

  const id = request.params.id;

  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: "you have no authorization to delete this blog" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});
blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  response.status(200).json(newBlog.toJSON());
});

module.exports = blogsRouter;
