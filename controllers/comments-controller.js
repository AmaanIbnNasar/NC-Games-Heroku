const { selectCommentsByReviewid } = require("../models/comments-model");

exports.getCommentsByReviewId = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const comments = await selectCommentsByReviewid(review_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};
