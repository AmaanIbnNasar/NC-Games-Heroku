const {
  selectCommentsByReviewid,
  insertComment,
  removeComment,
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
    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await removeComment(comment_id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
