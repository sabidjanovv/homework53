const Joi = require('joi');
const Category = require("../schemas/Category");
const { errorHandler } = require("../helpers/error_handler");
const { categoryValidation } = require('../validations/category.validations');

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);

    if(error){
      return res.status(400).send({message: error.message});
    }
    const { category_name, parent_category_id } = value;
    // const category = await Category.findOne({
    //   category_name:{$regex}
    // })
    const category = new Category({ category_name, parent_category_id });
    await category.save();
    res.status(201).send({ message: "Category added successfully", category });


  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent_category_id");
    res.send(categories);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "parent_category_id"
    );
    if (!category)
      return res.status(404).send({ message: "Category not found" });
    res.send(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { category_name, parent_category_id },
      { new: true }
    );
    if (!category)
      return res.status(404).send({ message: "Category not found" });
    res.send(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).send({ message: "Category not found" });
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
