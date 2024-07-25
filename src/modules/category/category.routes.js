import express from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './controler/category.controller.js';
import { validation } from '../../middelware/validation.js';
import { addCategorySchema, getByIdSchema, updateCategorySchema } from './category.validation.js';
import { uploadSingle } from '../../utils/fileUplode.js';
import subCategoryRoutes from '../subcategory/subCategory.routes.js';

const categoryRoutes = express.Router({mergeParams:true});


categoryRoutes.use("/:category/subCategory",subCategoryRoutes)
categoryRoutes.route("/")
.post(uploadSingle('image') ,validation(addCategorySchema),addCategory)
.get(getAllCategories)


categoryRoutes.route("/:id")
.get(validation(getByIdSchema),getCategoryById)
.patch(validation(updateCategorySchema),updateCategory)
.delete(validation(getByIdSchema), deleteCategory)


export default categoryRoutes;