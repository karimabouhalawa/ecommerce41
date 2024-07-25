
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        minLength:[3,"title is too short"],
        maxLength:[30,"title is too long"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        minLength:[3,"title is too short"],
        maxLength:[300,"title is too long"],
        required:true,
        
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDescount:{
        type:Number,
        min:0,
        required:true
    },
    imageCover:String,
    images:[String],
    sold:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    rateCount:Number,
    rateAvag:{
        type:Number,
        min:0,
        max:5
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    SubCategory:{
        type:mongoose.Types.ObjectId,
        ref:"subCategory"
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },



},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


productSchema.post("init",function(doc){
    doc.imageCover = process.env.BASE_URL + "/uploads" + doc.imageCover;
    if( doc.images)doc.images = doc.images.map(ele=>process.env.BASE_URL + "/uploads" + ele)

});

productSchema.virtual('myReview', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
  });

  productSchema.pre(/^find/,function(){
    this.populate("myReview")
  })


const  productModel = mongoose.model("Product",productSchema);

export default productModel;