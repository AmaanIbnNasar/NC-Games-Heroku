const db = require("../db/connection");
const { selectReviewById } = require("./reviews-model");

exports.selectCommentsByReviewid = async (review_id) => {
  const review = await selectReviewById(review_id);
  if (!review) {
    throw { status: 404, msg: `Review id ${review_id} does not exist` };
  } else {
    const { rows } = await db.query(
      `SELECT * FROM comments LEFT JOIN reviews ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1`,
      [review_id]
    );
    return rows;
  }
};

exports.insertComment = async (review_id, newComment) => {
  if (
    !newComment.hasOwnProperty("username") ||
    !newComment.hasOwnProperty("body")
  ) {
    throw { status: 400, msg: "Bad request: missing properties" };
  }
  const { rows } = await db.query(
    `
    INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *`,
    [newComment.username, newComment.body, review_id]
  );
  return rows[0];
};
