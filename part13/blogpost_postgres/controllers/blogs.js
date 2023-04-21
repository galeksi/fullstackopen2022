const { Op } = require("sequelize");
const router = require("express").Router();

const { Blog, User } = require("../models/index");
const { tokenValidator } = require("../util/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    next(Error(`Invalid blog with id: ${req.params.id}`));
  }
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenValidator, async (req, res) => {
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

router.delete("/:id", [blogFinder, tokenValidator], async (req, res, next) => {
  if (req.blog.toJSON().userId === req.decodedToken.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    next(Error("Invalid user for deletion"));
  }
});

module.exports = router;
