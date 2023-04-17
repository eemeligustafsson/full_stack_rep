const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("one initial user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHashed = await bcrypt.hash("salainen", 10);
    const user = new User({
      username: "first_user",
      passwordHash: passwordHashed,
    });
    await user.save();
  });
  test("user creation fails with missing username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "xd",
      password: "kissa4321",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("you must provide a username");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user creation fails with a password shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "clowj",
      name: "deez",
      password: "ab",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("invalid password, < 3");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user creation fails with provided username that is already in use", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "first_user",
      name: "deez",
      password: "kissa1234",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username already in use");
    const usersAtEnd = await helper.usersInDb();
    console.log(usersAtEnd)
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
