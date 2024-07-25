import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import brandModel from "../../../../db/models/brand.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";




const addBrand = handelError( async (req,res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.logo = req.file.filename 
    let preBrand = new brandModel(req.body)
    let added = await preBrand.save();
    res.json({message:"added",added})
})


const  getAllBrands =  async (req , res) =>{
    let apiFeature = new apiFeatures(brandModel.find(),req.query).pagination().search().sort().fields()
    let results = await apiFeature.mongooseQuery
    res.json({message:"done",results});
}

const  getBrandById =  async (req , res) =>{
    let brand = await brandModel.findById(req.params.id);
    res.json({message:"done",brand});
}


const  updateBrand = async (req , res)=>{
    req.body.slug=slugify(req.body.title)
    if(req.file) req.body.logo = req.file.filename;
    let updatedBrand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedBrand && res.json({message:'done',updatedBrand})
    !updatedBrand && res.json({message:"not found brand",})

}


const  deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
   
}