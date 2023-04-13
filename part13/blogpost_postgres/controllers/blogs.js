const router = require("express").Router();

const { Blog } = require("../models/index");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  console.log(req.blog);
  if (!req.blog) {
    next(Error(`Invalid blog with id: ${req.params.id}`));
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
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

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;
