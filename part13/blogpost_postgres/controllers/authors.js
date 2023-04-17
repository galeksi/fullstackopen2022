const router = require("express").Router();

const { Blog } = require("../models/index");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const blogsByAuthor = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
    ],
    group: [["author"]],
    order: [["likes", "DESC"]],
  });
  res.json(blogsByAuthor);
});

module.exports = router;
