import slugify from "slugify"
import categoryModel from "../../../../db/models/category.model.js"
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";



const addCategory = handelError( async (req,res)=>{

    console.log(req.file,"controller");
    req.body.slug = slugify(req.body.title)
    req.body.image = req.file.filename 
    let preCategory = new categoryModel(req.body)
    console.log(preCategory);
    let added = await preCategory.save();
    res.json({message:"added",added})
})


const  getAllCategories =  async (req , res) =>{
    let apiFeature = new apiFeatures(categoryModel.find(),req.query).pagination().search().sort().fields()
    let results = await apiFeature.mongooseQuery
    // console.log(results);
    res.json({message:"done",results});
}

const  getCategoryById =  async (req , res) =>{
    let Category = await categoryModel.findById(req.params.id);
    res.json({message:"done",Category});
}


const  updateCategory = async (req , res)=>{
    req.body.slug=slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedCategory && res.json({message:'done',updatedCategory})
    !updatedCategory && res.json({message:"not found category",})

}


const  deleteCategory = deleteOne(categoryModel)

export {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory

}