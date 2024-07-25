import slugify from "slugify";
import apiFeatures from "../../../utils/apiFeatures.js";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import productModel from "../../../../db/models/product.model.js";



const addProduct = handelError( async (req,res)=>{
   
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename;
    req.body.images = req.files.images.map( ele => ele.filename)
    let preProduct =  new productModel(req.body)
    let added = await preProduct.save();
    res.json({message:"added",added})
})


const  getAllProducts =  async (req , res) =>{
   let apiFeature = new apiFeatures(productModel.find(),req.query).pagination().search().filter().sort().fields()
    let results = await apiFeature.mongooseQuery
    res.json({message:"done",page:apiFeature.page,results});
}

const  getProductsById =  async (req , res) =>{
    let product= await productModel.findById(req.params.id);
    res.json({message:"done",product});
}


const  updateProduct = async (req , res)=>{
    req.body.slug=slugify(req.body.title)
    if(req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
    if(req.files.images) req.body.images = req.files.images.map(ele=>ele.filename)

    let updatedProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedProduct && res.json({message:'done',updatedProduct})
    !updatedProduct && res.json({message:"not found product",})

}


const  deleteProduct = deleteOne(productModel)

export {
   addProduct,
   getAllProducts,
   getProductsById,
   updateProduct,
   deleteProduct
}