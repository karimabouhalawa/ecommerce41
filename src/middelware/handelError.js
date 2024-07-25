import { appError } from "../utils/appError.js"


export const handelError = (fn)=>{
    return (req,res,next)=>{
      fn(req,res,next).catch( err=> next(new appError(err,401)))
    }
    
}