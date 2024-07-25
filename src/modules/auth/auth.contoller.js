import jwt from "jsonwebtoken";
import userModel from "../../../db/models/user.model.js";
import { handelError } from "../../middelware/handelError.js";
import { appError } from "../../utils/appError.js";
import bcrypt from "bcrypt";

export const signUp = handelError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) return next(new appError("Email Already Exist", 409));
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "added", user });
});

export const signIn = handelError(async (req, res, next) => {
  let { email, password } = req.body;
  let isFound = await userModel.findOne({ email });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token = jwt.sign(
      { name: isFound.name, _id: isFound._id, role: isFound.role },
      "karim"
    );
    return res.json({ message: "success", token });
  }
  next(new appError("incorrect email or password", 401));
});

export const protectedRoutes = handelError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new appError("please provide token", 401));
  let decoded = jwt.verify(token,"karim");
  let user = await userModel.findById(decoded._id);
  if (!user) return next(new appError("user not found", 404));
  if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (decoded.iat < changePasswordTime)
      return next(new appError("invalid token", 401));
  }
  req.user= user;
  next();
});
