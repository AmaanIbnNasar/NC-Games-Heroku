const db = require("../db/connection");
const { selectReviewById } = require("./reviews-model");

exports.selectCommentsByReviewid = async (review_id) => {
  await selectReviewById(review_id);
  const { rows } = await db.query(
    `SELECT * FROM comments LEFT JOIN reviews ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1`,
    [review_id]
  );
  return rows;
};

exports.insertComment = async (review_id, newComment) => {
  if (
    !newComment.hasOwnProperty("username") ||
    !newComment.hasOwnProperty("body")
  ) {
    throw { status: 400, msg: "Bad request: missing properties" };
  }
  await selectReviewById(review_id);
  const { rows } = await db.query(
    `
    INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *`,
    [newComment.username, newComment.body, review_id]
  );
  return rows[0];
};

exports.getComment = async (comment_id) => {
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE comment_id = $1`,
    [comment_id]
  );
  if (rows.length === 0) {
    throw { status: 404, msg: `Comment id ${comment_id} does not exist` };
  }
  return rows[0];
};

exports.removeComment = async (comment_id) => {
  await exports.getComment(comment_id);
  await db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
};
