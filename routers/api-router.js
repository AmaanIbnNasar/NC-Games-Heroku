const categoriesRouter = require("./categories-router");

const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "All okay" });
});

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
