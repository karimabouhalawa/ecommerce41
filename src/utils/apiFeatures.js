import productModel from "../../db/models/product.model.js";


export default class apiFeatures {
    constructor(mongooseQuery,QueryString){
        this.mongooseQuery = mongooseQuery;
        this.QueryString = QueryString;
    }
    pagination(){
        let page = this.QueryString.page *1 || 1 ;
        if(this.QueryString.page <= 0) page = 1;
        let skip = (page - 1) * 4;
        this.page = page;
        this.mongooseQuery.skip(skip).limit(4);
        return this;
    }

    filter(){
        let filter = {...this.QueryString}
        let excutedQuery = ["page","sort","keyword","fields"]
        excutedQuery.forEach((q)=>{
            delete filter[q]
    
        })
        filter = JSON.stringify(filter)
        filter = filter.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
        filter = JSON.parse(filter)
    
        this.mongooseQuery = productModel.find(filter)
        return this;
    }

    sort(){
        if(this.QueryString.sort){
            let sortBy = this.QueryString.sort.split(",").join(" ")
        
           this.mongooseQuery.sort(sortBy)
        };
        return this;
    }

    search(){
        if(this.QueryString.keyword){
            this.mongooseQuery.find({
                $or:[
                    {title:{$regex:req.query.keyword,$options:"i"}},
                    {description:{$regex:req.query.keyword,$options:"i"}},]
            })
    
        }
        return this;
    }
    fields(){
        if(this.QueryString.fields){
            let fields = this.QueryString.fields.split(",").join(" ")
        
            this.mongooseQuery.select(fields)
        }
        return this;
    }
}