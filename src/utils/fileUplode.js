import  mongoose from "mongoose";
import multer from "multer";
import { appError } from "./appError.js";





const uploadeFile =()=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null, new mongoose.Types.ObjectId + '_' + file.originalname)
        }
      });

      function fileFilter (req, file, cb) {

        if(file.mimetype.startsWith(`image`)){
            cb(null, true)
        }else{
            cb(new appError("invaid image type",401) , false)
        }}
    
      
      const upload = multer({ storage,fileFilter })
      return upload;
};


export const uploadSingle = (fieldName)=> uploadeFile().single(fieldName);
export const uploadArray = (fieldName)=> uploadeFile().array(fieldName,10);
export const uploadFields = (fieldName)=> uploadeFile().fields(fieldName);

