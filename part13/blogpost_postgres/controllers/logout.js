const router = require("express").Router();

const { Session } = require("../models/index");
const { tokenValidator } = require("../util/middleware");

router.delete("/", tokenValidator, async (req, res) => {
  const token = req.get("authorization").substring(7);
  const session = await Session.findByPk(token);
  await session.destroy();
  res.status(204).end();
});

module.exports = router;
