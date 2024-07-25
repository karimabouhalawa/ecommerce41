import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";
import { appError } from "../../../utils/appError.js";
import userModel from "../../../../db/models/user.model.js";




const addUser = handelError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email}) 
    if(user)return next(new appError('dublicate Error',409))
    let preUser = new userModel(req.body)
    let added = await preUser.save();
    res.json({message:"added",added})
})


const  getAllUsers = handelError( async (req , res,next) =>{
    let apiFeature = new apiFeatures(userModel.find(),req.query).pagination().search().sort().fields()
    let results = await apiFeature.mongooseQuery
    res.json({message:"done",results});
})

const  getUserById = handelError(async (req , res,next) =>{
    let User = await userModel.findById(req.params.id);
    res.json({message:"done",User});
})


const  updateUser = handelError(
    async (req , res,next)=>{
        let {id}= req.params
        req.body.slug=slugify(req.body.title)
        if(req.file) req.body.logo = req.file.filename;
        let updatedUser = await userModel.findByIdAndUpdate(id,req.body,{new:true})
        updatedUser && res.json({message:'done',updatedUser})
        !updatedUser && next(new appError("not found user",404))
    
    }
)


const  changePassword = handelError(
    async (req , res,next)=>{
        let {id}= req.params
        req.body.changePasswordAt=Date.now();
        let updatedUser = await userModel.findOneAndUpdate({_id:id},req.body,{new:true})
        updatedUser && res.json({message:'done',updatedUser})
        !updatedUser && next(new appError("not found user",404))
    
    }
)


const  deleteUser = deleteOne(userModel)

export {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
   
}