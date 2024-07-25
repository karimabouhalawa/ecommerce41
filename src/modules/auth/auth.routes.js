import express from 'express';
import * as authController from'./auth.contoller.js';
const authRouter = express.Router();




authRouter.post("/signUp",authController.signUp);
authRouter.post("/signIn",authController.signIn);


export default authRouter;