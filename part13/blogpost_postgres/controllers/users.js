const router = require("express").Router();

const { User, Blog } = require("../models/index");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read;
  }

  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: [""] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "date", "createdAt", "updatedAt"] },
        through: {
          attributes: ["id", "read"],
          where,
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  console.log(user);
  if (user && req.body.username) {
    user.username = req.body.username;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
