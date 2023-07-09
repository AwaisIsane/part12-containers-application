const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", async (req, res) => {
  const result = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    comments: 1,
  });

  res.json(result);
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.password || body.password === "") {
    return res.status(400).json({ error: "password is required" });
  }

  if (body.password.length < 4) {
    return res.status(400).json({ error: "password shoud be >= 3 char long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
