const express = require("express");
const { psqlErrors, customErrors } = require("./controllers/errors-controller");
const apiRouter = require("./routers/api-router");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
