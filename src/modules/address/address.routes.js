import express from "express";
import { protectedRoutes } from "../auth/auth.contoller.js";
import * as addressController from "./address.controller.js";
const addressRouter = express.Router();


addressRouter.patch("/",protectedRoutes,addressController.addToAddress);
addressRouter.get("/",protectedRoutes,addressController.getAllAddress);
addressRouter.delete("/",protectedRoutes,addressController.removeFromAddress);








export default addressRouter