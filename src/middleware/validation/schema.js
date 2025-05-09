import Joi from "joi";
import mongoose from "mongoose";

const phoneRegex = /^01[0125][0-9]{8}$/;

// ################# user #################
export const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
  phone: Joi.string().pattern(phoneRegex).required(),
  role: Joi.string().required().valid("customer", "staff", "admin"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
});
export const updateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required().min(3).max(30),
  phone: Joi.string().pattern(phoneRegex, "invalid").required(),
});

// ################# category #################

export const categorySchema = Joi.object({
  title: Joi.string().required().min(4).max(50),
});
export const updateCategorySchema = Joi.object({
  title: Joi.string().required().min(4).max(50),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      // Check if the categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Category ID must be a valid ObjectId");
      }
      return value;
    })
    .required(),
});

// ################# subCategory #################

export const createSubCategorySchema = Joi.object({
  title: Joi.string().required().min(4).max(50),
  category: Joi.string()
    .custom((value, helpers) => {
      // Check if the categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Category ID must be a valid ObjectId");
      }
      return value;
    })
    .required(),
});

export const updateSubCategorySchema = Joi.object({
  title: Joi.string().required().min(4).max(50),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      // Check if the categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Category ID must be a valid ObjectId");
      }
      return value;
    })
    .required(),
  subCategoryId: Joi.string()
    .custom((value, helpers) => {
      // Check if the categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("subCategory ID must be a valid ObjectId");
      }
      return value;
    })
    .required(),
});
