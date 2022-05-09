const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
usersRouter.post("/", async (req, res) => {
  const body = req.body;
  const { username, name, password } = body;
  if (password.length < 3)
    return res
      .status(400)
      .json({ error: "passoword must be at least 3 characters long" });
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});
module.exports = usersRouter;
