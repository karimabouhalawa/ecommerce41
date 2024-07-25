import mongoose from "mongoose";


const reviewsSchema = new mongoose.Schema({
    comment:{
        type: String,
        required:true,
        trim:true,
        
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    }


},{
    timestamps:true
})

reviewsSchema.pre(/^find/,function(){
    this.populate("createdBy","name")
})

const  reviewModel = mongoose.model("Review",reviewsSchema);

export default reviewModel;