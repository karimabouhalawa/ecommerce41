import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
        
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:String,
    role:{
        type:String,
        enums:["Admin","User"],
        default:"User"
    },
    password:{
        type:String,
        required:true
    },
    changePasswordAt:Date,
    wishlist:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Product"
    }],
    address:[{
        city:String,
        street:String,
        phone:String
    }],
    isActive:{
        type:Boolean,
        default:true
    },
   
    isBlocked:{
        type:Boolean,
        default:false
    },
  
    isVerfied:{
        type:Boolean,
        default:false
    },
    


},{
    timestamps:true
})

schema.pre("save",function(){
    this.password = bcrypt.hashSync(this.password,7);
})




schema.pre("findOneAndUpdate", async function (next) {
    if (this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, 7);
    }
});


const  userModel = mongoose.model("User",schema);

export default userModel;