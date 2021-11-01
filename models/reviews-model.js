const db = require("../db/connection");

exports.selectReviewById = async (id) => {
  const { rows } = await db.query(
    `SELECT reviews.*, COUNT(comment_id)::int AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON comments.review_id = reviews.review_id 
    WHERE reviews.review_id = $1 
    GROUP BY reviews.review_id, comments.comment_id`,
    [id]
  );
  if (rows.length === 0) {
    throw { status: 404, msg: `Review id ${id} does not exist` };
  } else {
    return rows[0];
  }
};
