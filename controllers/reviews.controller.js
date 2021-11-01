const {
  selectReviewById,
  updateReview,
  selectReviews,
} = require("../models/reviews-model");

exports.getReviews = async (req, res, next) => {
  try {
    let { sort_by, order, category } = req.query;
    if (!order) {
      order = "DESC";
    } else if (!["ASC", "asc", "DESC", "desc"].includes(order)) {
      throw {
        status: 400,
        msg: `Bad request: invalid order query param ${order}`,
      };
    }
    if (!sort_by) {
      sort_by = "created_at";
    } else if (
      ![
        "owner",
        "title",
        "review_id",
        "category",
        "review_img_url",
        "created_at",
        "votes",
        "comment_count",
      ].includes(sort_by)
    ) {
      throw { status: 400, msg: `Bad request: invalid sort column ${sort_by}` };
    }
    const reviews = await selectReviews(sort_by, order, category);
    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const review = await selectReviewById(review_id);
    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

exports.patchReview = async (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  try {
    if (!inc_votes) {
      throw { status: 400, msg: "Bad request" };
    }
    const review = await updateReview(review_id, inc_votes);
    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};
