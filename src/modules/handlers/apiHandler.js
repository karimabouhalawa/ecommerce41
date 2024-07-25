import { handelError } from "../../middelware/handelError.js"




export const deleteOne = (model)=>{
    return handelError(async (req , res,next)=>{
        let deleted = await model.findByIdAndDelete(req.params.id)
        deleted &&  res.json({message:"done"})
        !deleted &&  res.json({message:"not found"})
    
    })
}