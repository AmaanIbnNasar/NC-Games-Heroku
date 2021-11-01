const { getReviewById } = require("../controllers/reviews.controller");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/:review_id").get(getReviewById);

module.exports = reviewsRouter;
