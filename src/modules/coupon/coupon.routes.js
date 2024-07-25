import express from 'express';
import * as couponController from './controler/coupon.controller.js';
import { protectedRoutes } from '../auth/auth.contoller.js';

const couponRouter = express.Router();

couponRouter.route("/")
.post(protectedRoutes,couponController.addCoupon)
.get(couponController.getAllCoupons)


couponRouter.route("/:id")
.get(couponController.getCouponById)
.put(protectedRoutes,couponController.updateCoupon)
.delete( couponController.deleteCoupon)


export default couponRouter;