import express from 'express';
import * as orderController from './controler/order.controller.js';
import { protectedRoutes } from '../auth/auth.contoller.js';

const orderRouter = express.Router();

orderRouter.post("/:id",protectedRoutes,orderController.createCashOrder)
orderRouter.post("/cheakout/:id",protectedRoutes,orderController.paymentOnline)
orderRouter.get("/",protectedRoutes,orderController.getOrder)
orderRouter.get("/all",protectedRoutes,orderController.getAllOrder)




export default orderRouter;