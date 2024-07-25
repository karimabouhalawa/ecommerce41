import express from "express";
import { protectedRoutes } from "../auth/auth.contoller.js";
import * as wishListController from "./wishList.controller.js";
const wishListRouter = express.Router();


wishListRouter.patch("/",protectedRoutes,wishListController.addToWishList);
wishListRouter.delete("/",protectedRoutes,wishListController.removeFromWishList);
wishListRouter.get("/",protectedRoutes,wishListController.getAllWishList);






export default wishListRouter