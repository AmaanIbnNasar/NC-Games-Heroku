const db = require("../db/connection");

exports.selectCommentsByReviewid = async (review_id) => {
  const { rows } = await db.query(
    `SELECT * FROM comments LEFT JOIN reviews ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1`,
    [review_id]
  );
  return rows;
};
