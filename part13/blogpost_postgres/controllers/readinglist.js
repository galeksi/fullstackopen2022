const router = require("express").Router();

const { Readinglist } = require("../models/index");
const { tokenValidator } = require("../util/middleware");

router.post("/", async (req, res) => {
  const listEntry = await Readinglist.create(req.body);
  res.json(listEntry);
});

router.get("/", async (req, res) => {
  const readinglists = await Readinglist.findAll();
  res.json(readinglists);
});

router.put("/:id", tokenValidator, async (req, res, next) => {
  const readingList = await Readinglist.findByPk(req.params.id);
  const userId = req.decodedToken.id;
  if (readingList.dataValues.userId === userId) {
    readingList.read = req.body.read;
    const updatedList = await readingList.save();
    res.json(updatedList);
  } else {
    next(Error("Invalid user to mark readinglist"));
  }
});

module.exports = router;
