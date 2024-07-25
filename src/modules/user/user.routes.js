import express from 'express';
import * as userController from './controler/user.controller.js'



const userRouter = express.Router();

userRouter.route("/")
.post(userController.addUser)
.get(userController.getAllUsers)


userRouter.route("/:id")
.get(userController.getUserById)
.patch(userController.updateUser)
.delete( userController.deleteUser)

userRouter.put("/changePassword/:id",userController.changePassword)


export default userRouter;