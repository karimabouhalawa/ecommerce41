
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";
import couponModel from "../../../../db/models/coupon.model.js";
import QRCode from 'qrcode'


const addCoupon = handelError( 
    async (req,res,next)=>{ 
    let coupon = new couponModel(req.body)
    let added = await coupon.save();
    res.json({message:"added",added})
})


const  getAllCoupons =  async (req , res) =>{
    let apiFeature = new apiFeatures(couponModel.find(),req.query).pagination().search().sort().fields()
    let results = await apiFeature.mongooseQuery
    res.json({message:"done",results});
}

const  getCouponById =  async (req , res) =>{
    let Coupon = await couponModel.findById(req.params.id);
    let url = await QRCode.toDataURL(Coupon.code)
    res.json({message:"done",Coupon,url});
}


const  updateCoupon = async (req , res)=>{
    let {id} =req.params;
    let updatedCoupon = await couponModel.findOneAndUpdate({_id:id},req.body,{new:true})
    updatedCoupon && res.json({message:'done',updatedCoupon})
    !updatedCoupon && res.json({message:"not found Review",})

}


const  deleteCoupon = deleteOne(couponModel)

export {
   addCoupon,
   getAllCoupons,
   getCouponById,
   updateCoupon,
   deleteCoupon
}