
import cartModel from "../../../../db/models/cart.model.js";
import orderModel from "../../../../db/models/order.model.js";
import productModel from "../../../../db/models/product.model.js";
import { handelError } from "../../../middelware/handelError.js";
import { appError } from "../../../utils/appError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PTOyA09sx4hOCtlyqAg0q0TQGYnwNzPrINddYVLOSfZqPXPmmy3VSMr4HxQ0R7fCfNAicx75yfGbOeVS4kpKbbC00lcRoJ4Jj');



const createCashOrder = handelError( async (req,res,next)=>{

let cart = await cartModel.findById(req.params.id);
let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount:cart.totalPrice;
let order = new orderModel({
    user:req.user._id,
    cartItems:cart.cartItems,
    totalOrderPrice,
    shippingAdress:req.body.shippingAdress
})
if(order){
    let options = cart.cartItems.map((item)=>({
        updateOne:{
            filter:{_id:item.product},
            update:{$inc:{quantity:-item.quantity,sold:item.quantity}}
        }
    }))
    await productModel.bulkWrite(options)
    await order.save()
}else{
    return next(new appError("not found",409))
}
await cartModel.findByIdAndDelete(req.params.id)
res.json({message:"done",order})
    
   
});

const getOrder = handelError(async(req,res,next)=>{
    let orders = await orderModel.findOne({user:req.user._id}).populate("cartItems.product")
    res.json({message:"done",orders})
})


const getAllOrder = handelError(async(req,res,next)=>{
    let orders = await orderModel.find({user:req.user._id}).populate("cartItems.product")
    res.json({message:"done",orders})
})

const paymentOnline = handelError(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id);
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount:cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:"egp",
                unit_amount:totalOrderPrice*100,
                product_data:{
                    name:req.user.name,
                }
            },
            quantity:1,
        }],
        mode:"payment",
        success_url:"http://localhost:3000/api/v1/product",
        cancel_url:"http://localhost:3000/api/v1/cart",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAdress
    })
    res.json({message:"done",session})
})

export {
    createCashOrder,
    getOrder,
    getAllOrder,
    paymentOnline
  
}