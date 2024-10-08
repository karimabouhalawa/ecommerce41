import Joi from "joi";

 const addProductSchema =  Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).max(300).required(),
    priceAfterDescount:Joi.number().min(0).required(),
    price:Joi.number().min(0).required(),
    quantity:Joi.number().min(0).required(),
    category:Joi.string().hex().length(24).required(),
    SubCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname: Joi.string( ).required(),
        originalname: Joi.string( ).required(),
        encoding: Joi.string( ).required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required() ,
        destination: Joi.string( ).required(),
        filename:Joi.string( ).required(),
        path: Joi.string( ).required(),
        size: Joi.number().max(5242880).required()
    }).required()).required(),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string( ).required(),
        originalname: Joi.string( ).required(),
        encoding: Joi.string( ).required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required() ,
        destination: Joi.string( ).required(),
        filename:Joi.string( ).required(),
        path: Joi.string( ).required(),
        size: Joi.number().max(5242880).required()
    }).required()).required()
    

    
});



const productIdSchema=  Joi.object({
    id:Joi.string().hex().length(24).required(),
});


const updateProductSchema =  Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).max(20).required(),
    description:Joi.string().min(3).max(300).required(),
    priceAfterDescount:Joi.number().min(0).required(),
    price:Joi.number().min(0).required(),
    quantity:Joi.number().min(0).required(),
    category:Joi.string().hex().length(24).required(),
    SubCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname: Joi.string( ).required(),
        originalname: Joi.string( ).required(),
        encoding: Joi.string( ).required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required() ,
        destination: Joi.string( ).required(),
        filename:Joi.string( ).required(),
        path: Joi.string( ).required(),
        size: Joi.number().max(5242880).required()
    }).required()).required(),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string( ).required(),
        originalname: Joi.string( ).required(),
        encoding: Joi.string( ).required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required() ,
        destination: Joi.string( ).required(),
        filename:Joi.string( ).required(),
        path: Joi.string( ).required(),
        size: Joi.number().max(5242880).required()
    }).required()).required()
    
})


export{
    addProductSchema,
    productIdSchema,
    updateProductSchema
}







