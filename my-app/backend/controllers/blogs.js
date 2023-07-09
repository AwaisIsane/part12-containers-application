const blogsRouter = require("express").Router();
const { request } = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogs");
const User = require("../models/users");

blogsRouter.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", { username: 1, name: 1 });

  res.json(result);
});

blogsRouter.post("/", async (req, res) => {
  const { body } = req;

  // const tok = req.token
  //const decodedtok = jwt.verify(tok,process.env.SECRET)
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blobj = "likes" in body ? { ...body } : { ...body, likes: 0 };
  const nblobj = { ...blobj, user: user._id };

  if (!blobj.title || !blobj.url) {
    return res.status(400).json({ error: "title or url is missing" });
  }
  const blog = new Blog(nblobj);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);
  await user.save();
  res.status(201).json(result.toJSON());
});
blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  if (updatedBlog) {
    res.status(200).json(updatedBlog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  //const tok = req.token
  //const decodedtok = jwt.verify(tok,process.env.SECRET)
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).json({ error: "blog was not created by this user" });
    }
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const comment = req.body.comment;
  if (comment && comment.length > 0) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );

    if (updatedBlog) {
      res.status(200).json(updatedBlog.toJSON());
    } else {
      res.status(404).end();
    }
  } else {
    res.status(401).json({ error: "no comment in body" });
  }
});

module.exports = blogsRouter;
