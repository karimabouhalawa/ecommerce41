import express from 'express';
import * as cartController from './controler/cart.controller.js';
import { protectedRoutes } from '../auth/auth.contoller.js';

const cartRouter = express.Router();

cartRouter.route("/")
.post(protectedRoutes,cartController.createCart).get(protectedRoutes,cartController.getCart)
.put(protectedRoutes,cartController.updateCartItems)

cartRouter.route("/:id").delete(protectedRoutes,cartController.removeCartItem)


// .get(reviewController.getReviewById)


export default cartRouter;