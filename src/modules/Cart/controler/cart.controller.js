
import { handelError } from "../../../middelware/handelError.js";
import { appError } from "../../../utils/appError.js";
import cartModel from "../../../../db/models/cart.model.js";
import productModel from "../../../../db/models/product.model.js";
import couponModel from "../../../../db/models/coupon.model.js";

function calcPrice(cart){
    
    let totalPrice = 0;
    cart.cartItems.forEach((ele)=>{
        totalPrice += ele.price * ele.quantity
    })

    cart.totalPrice = totalPrice;

}



const createCart = handelError( async (req,res,next)=>{

    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new appError("product not found",404))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({user:req.user._id})
    if(!isCartExist){
        let cart = new cartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcPrice(cart);
        await cart.save()
        res.status(201).json({status:"success",cart})
    }

    let item = isCartExist.cartItems.find((ele)=>ele.product == req.body.product)
    if(item){
        item.quantity +=1
    }else{
        isCartExist.cartItems.push(req.body)
    }

    calcPrice(isCartExist);

    if(isCartExist.discount)isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount)/100

    await isCartExist.save()
    res.json({message:"good",isCartExist})
   
   
});


const getCart = handelError(async(req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id})
    !cart && next(new appError("cart not found",404))
    res.json({status:"success",cart})

});



const removeCartItem = handelError(async(req,res,next)=>{
    let removeItem = await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcPrice(removeItem)
  
    res.json({message:"deleted",removeItem})
})


const updateCartItems =
 handelError(
    async(req,res,next)=>{
    let product = await productModel.findById(req.body.product).select("price")
    
    !product && next(new appError("product not found",404))

    req.body.price = product.price
    let isCartExist = await cartModel.findOne({user:req.user._id})
   
   

    let item = isCartExist.cartItems.find((ele)=>ele.product == req.body.product)
    !item && next(new appError("cart not found",404))
    if(item){
        item.quantity = req.body.quantity
    }

    calcPrice(isCartExist);

    await isCartExist.save()
    res.json({message:"good",isCartExist})
   
}
)

const applyCoupon = handelError(async (req,res,next)=>{
    let code = await couponModel.findOne({code:req.params.code})
    let cart = await cartModel.findOne({user:req.user._id})
    cart.totalPriceAfterDiscount = cart.price - (cart.price * code.discount)/100;
    cart.discount = code.discount
    await cart.save()
    res.json({message:"done",cart})
})



export {
    createCart,
    getCart,
    removeCartItem,
    updateCartItems,
    applyCoupon
}