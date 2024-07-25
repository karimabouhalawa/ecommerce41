import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import SubCategoryModel from "../../../../db/models/subCategory.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import apiFeatures from "../../../utils/apiFeatures.js";

const addSubCategory = handelError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.image = req.file.filename;
  let preCategory = new SubCategoryModel(req.body);
  let added = await preCategory.save();
  res.json({ message: "added", added });
});

const getAllSubCategories = async (req, res) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.category = req.params.category;
  }

  let apiFeature = new apiFeatures(SubCategoryModel.find(), req.query)
    .pagination()
    .search()
    .sort()
    .fields();
  let results = await apiFeature.mongooseQuery;

  res.json({ message: "done", results });
};

const getSubCategoryById = async (req, res) => {
  let subCategory = await SubCategoryModel.findById(req.params.id);
  res.json({ message: "done", subCategory });
};

const updateSubCategory = async (req, res) => {
  req.body.slug = slugify(req.body.title);
  let updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  updatedSubCategory && res.json({ message: "done", updatedSubCategory });
  !updatedSubCategory && res.json({ message: "not found subCategory" });
};

const deleteSubCategory = deleteOne(SubCategoryModel);

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
