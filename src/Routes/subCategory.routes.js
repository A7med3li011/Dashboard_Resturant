import express from "express";

import { auth } from "../middleware/auth/auth.js";
import { multer4server } from "../services/multer.js";
import { validate } from "../middleware/validation/execution.js";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
} from "../middleware/validation/schema.js";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  updateSubCategory,
} from "../controllers/subCategory.controller.js";

const subCategoryRoutes = express.Router();

subCategoryRoutes.post(
  "/",
  multer4server().single("image"),
  validate(createSubCategorySchema),
  auth(["admin"]),
  createSubCategory
);
subCategoryRoutes.put(
  "/",
  multer4server().single("image"),
  auth(["admin"]),
  validate(updateSubCategorySchema),
  updateSubCategory
);
subCategoryRoutes.delete("/:id", auth(["admin"]), deleteSubCategory);
subCategoryRoutes.get(
  "/",
  auth(["admin", "customer", "staff"]),
  getSubCategories
);
export default subCategoryRoutes;
