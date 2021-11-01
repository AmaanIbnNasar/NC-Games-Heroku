const {
  getReviewById,
  patchReview,
  getReviews,
} = require("../controllers/reviews.controller");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReview);

module.exports = reviewsRouter;
