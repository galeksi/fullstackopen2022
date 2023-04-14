const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const router = require("express").Router();

const { Blog, User } = require("../models/index");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    next(Error(`Invalid blog with id: ${req.params.id}`));
  }
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    next(Error("Token missing"));
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  return res.json(blog);
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.body.likes && !isNaN(Number(req.body.likes))) {
    const blog = req.blog;
    blog.likes = req.body.likes;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    next(Error("Invalid data for updating likes"));
  }
});

router.delete("/:id", [blogFinder, tokenExtractor], async (req, res, next) => {
  if (req.blog.toJSON().userId === req.decodedToken.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    next(Error("Invalid user for deletion"));
  }
});

module.exports = router;
