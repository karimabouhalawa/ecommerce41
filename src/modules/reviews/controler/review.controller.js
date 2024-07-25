
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";
import reviewModel from "../../../../db/models/reviews.model.js";
import { appError } from "../../../utils/appError.js";





const addReview = handelError( async (req,res,next)=>{
    req.body.user = req.user._id
    let isReview = await reviewModel.findOne({createdBy:req.user._id,product:req.body.product})
    if(isReview) return next(new appError("already have review",409))
    let preReview = new reviewModel(req.body)
    let added = await preReview.save();
    res.json({message:"added",added})
})


const  getAllReviews =  async (req , res) =>{
    let apiFeature = new apiFeatures(reviewModel.find(),req.query).pagination().search().sort().fields()
    let results = await apiFeature.mongooseQuery
    res.json({message:"done",results});
}

const  getReviewById =  async (req , res) =>{
    let Review = await reviewModel.findById(req.params.id);
    res.json({message:"done",Review});
}


const  updateReview = async (req , res)=>{
    let {id} =req.params;
    let updatedReview = await reviewModel.findOneAndUpdate({_id:id,createdBy:req.user._id},req.body,{new:true})
    updatedReview && res.json({message:'done',updatedReview})
    !updatedReview && res.json({message:"not found Review",})

}


const  deleteReview = deleteOne(reviewModel)

export {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
   
}