import userModel from "../../../db/models/user.model.js";
import { handelError } from "../../middelware/handelError.js";
import { appError } from "../../utils/appError.js";

export const addToAddress = handelError( 
  async (req, res, next) => {
  let  {city,street,phone } = req.body;  
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    { $addToSet: { address: { city, street, phone } } },
    { new: true },
  );

  !results && next(new appError("not found address", 404));
  results && res.json({ message: "done", results });
});



export const removeFromAddress = handelError( 
  async (req, res, next) => {
  let  { _id } = req.body;
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {$pull:[{address:{_id}}]},
    { new: true },
  );
  !results && next(new appError("not found review", 404));
  results && res.json({ message: "done", results });
});



export const getAllAddress = handelError( 
  async (req, res, next) => {
  let results = await userModel.findOne({_id:req.user._id,});
  !results && next(new appError("not found review", 404));
  results && res.json({ message: "done", results:results.address });
});