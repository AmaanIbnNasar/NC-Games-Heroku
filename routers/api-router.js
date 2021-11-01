const categoriesRouter = require("./categories-router");
const commentsRouter = require("./comments-router");
const reviewsRouter = require("./reviews-router");
const fs = require("fs/promises");

const apiRouter = require("express").Router();

apiRouter.get("/", async (req, res) => {
  const fileContents = await fs.readFile("./endpoints.json");
  res.status(200).send({ endpoints: JSON.parse(fileContents) });
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
