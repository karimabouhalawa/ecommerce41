import express from 'express';
import { validation } from '../../middelware/validation.js';
import { uploadFields}  from '../../utils/fileUplode.js';
import{addProductSchema, productIdSchema, updateProductSchema} from './product.validation.js'
import * as prductController from './controler/product.controller.js'
import { protectedRoutes } from '../auth/auth.contoller.js';

const productRoutes = express.Router();

productRoutes.route("/")
.post(protectedRoutes,
uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:8}]),
 validation(addProductSchema),prductController.addProduct)
.get(prductController.getAllProducts)


productRoutes.route("/:id")
.get(validation(productIdSchema),prductController.getProductsById)
.patch(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:8}]),
 validation(updateProductSchema),prductController.updateProduct)
.delete(validation(productIdSchema), prductController.deleteProduct)


export default productRoutes;