const db = require("../db/connection");

exports.selectReviews = async (sort_by, order, category) => {
  const { rows } = await db.query(
    `SELECT reviews.*, COUNT(comment_id)::int AS comment_count 
        FROM reviews 
        LEFT JOIN comments ON comments.review_id = reviews.review_id 
        WHERE category = $1
        GROUP BY reviews.review_id 
        ORDER BY ${sort_by} ${order};`,
    [category]
  );
  return rows;
};

exports.selectReviewById = async (id) => {
  const { rows } = await db.query(
    `SELECT reviews.*, COUNT(comment_id)::int AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON comments.review_id = reviews.review_id 
    WHERE reviews.review_id = $1 
    GROUP BY reviews.review_id, comments.comment_id;`,
    [id]
  );
  if (rows.length === 0) {
    throw { status: 404, msg: `Review id ${id} does not exist` };
  } else {
    return rows[0];
  }
};

exports.updateReview = async (id, votes) => {
  if (!Number.isInteger(votes)) {
    throw { status: 400, msg: "Bad request: votes must be an integer" };
  }
  const { rows } = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
    [votes, id]
  );
  return rows[0];
};
