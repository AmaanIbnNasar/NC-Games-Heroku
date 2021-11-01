const db = require("../db/connection");

exports.selectReviewById = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM reviews WHERE review_id = $1;`,
    [id]
  );
  if (rows.length === 0) {
    throw { status: 404, msg: `Review id ${id} does not exist` };
  } else {
    return rows[0];
  }
};
