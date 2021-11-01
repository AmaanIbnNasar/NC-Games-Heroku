const {
  selectCommentsByReviewid,
  insertComment,
} = require("../models/comments-model");

exports.getCommentsByReviewId = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const comments = await selectCommentsByReviewid(review_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  const { review_id } = req.params;
  const newComment = req.body;
  try {
    const comment = await insertComment(review_id, newComment);
    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};
