const { selectReviewById } = require("../models/reviews-model");

exports.getReviewById = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const review = await selectReviewById(review_id);
    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};
