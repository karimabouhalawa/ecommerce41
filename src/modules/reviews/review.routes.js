import express from 'express';
import * as reviewController from './controler/review.controller.js';
import { protectedRoutes } from '../auth/auth.contoller.js';

const reviewRouter = express.Router();

reviewRouter.route("/")
.post(protectedRoutes,reviewController.addReview)
.get(reviewController.getAllReviews)


reviewRouter.route("/:id")
.get(reviewController.getReviewById)
.put(protectedRoutes,reviewController.updateReview)
.delete( reviewController.deleteReview)


export default reviewRouter;