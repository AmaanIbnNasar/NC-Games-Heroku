const { selectCategories } = require("../models/categories-model");

exports.getCategories = async (req, res) => {
  const categories = await selectCategories();
  res.status(200).send({ categories });
};
