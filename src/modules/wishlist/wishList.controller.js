import userModel from "../../../db/models/user.model.js";
import { handelError } from "../../middelware/handelError.js";
import { appError } from "../../utils/appError.js";

export const addToWishList = handelError( 
  async (req, res, next) => {
  let  {product } = req.body;
    
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {$addToSet:{wishlist:product} },
    { new: true },
  );

  !results && next(new appError("not found review", 404));
  results && res.json({ message: "done", results });
});



export const removeFromWishList = handelError( 
  async (req, res, next) => {
  let  {product } = req.body;
    
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    { $pull:{wishlist:product}},
    { new: true },
  );

  !results && next(new appError("not found review", 404));
  results && res.json({ message: "done", results });
});



export const getAllWishList = handelError( 
  async (req, res, next) => {
  let results = await userModel.findOne({_id:req.user._id,});
  !results && next(new appError("not found review", 404));
  results && res.json({ message: "done", results:results.wishlist });
});