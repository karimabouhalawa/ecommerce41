import express from 'express';
import { validation } from '../../middelware/validation.js';
import {  addSubCategorySchema, getByIdSchema, updateSubCategorySchema } from './subCategory.validation.js';
import { uploadSingle } from '../../utils/fileUplode.js';
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from './controler/subCategory.controller.js';

const subCategoryRoutes = express.Router();

subCategoryRoutes.route("/")
.post(uploadSingle('image') ,validation(addSubCategorySchema),addSubCategory)
.get(getAllSubCategories)


subCategoryRoutes.route("/:id")
.get(validation(getByIdSchema),getSubCategoryById)
.patch(validation(updateSubCategorySchema),updateSubCategory)
.delete(validation(getByIdSchema), deleteSubCategory)


export default subCategoryRoutes;