const bcrypt = require("bcrypt");
const { response } = require("../app");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const username = body.username;

  const validPassword = body.password.length >= 3 ? true : false;
  const validUserName = await User.findOne({ username });

  if (!username) {
    return response.status(400).json({ error: "you must provide a username" });
  }

  if (!validPassword) {
    return response.status(400).json({ error: "invalid password, < 3" });
  }
  if (validUserName) {
    return response.status(400).json({ error: "username already in use" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    content: 1,
    important: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
