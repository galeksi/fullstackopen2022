const router = require("express").Router();

const { Readinglist } = require("../models/index");
const { sequelize } = require("../util/db");

router.post("/", async (req, res) => {
  const listEntry = await Readinglist.create(req.body);
  res.json(listEntry);
});

module.exports = router;
