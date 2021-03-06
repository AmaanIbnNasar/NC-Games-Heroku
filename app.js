const express = require("express");
const cors = require("cors");
const { psqlErrors, customErrors } = require("./controllers/errors-controller");
const apiRouter = require("./routers/api-router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(psqlErrors);
app.use(customErrors);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
