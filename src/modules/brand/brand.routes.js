import express from 'express';
import { validation } from '../../middelware/validation.js';
import { uploadSingle } from '../../utils/fileUplode.js';
import { addBrand, deleteBrand, getAllBrands,getBrandById,updateBrand } from './controler/brand.controller.js';
import { addBrandSchema, getBrandByIdSchema, updateBrandSchema } from './brand.validation.js';

const brandRoutes = express.Router();

brandRoutes.route("/")
.post(uploadSingle('image') ,validation(addBrandSchema),addBrand)
.get(getAllBrands)


brandRoutes.route("/:id")
.get(validation(getBrandByIdSchema),getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(getBrandByIdSchema), deleteBrand)


export default brandRoutes;