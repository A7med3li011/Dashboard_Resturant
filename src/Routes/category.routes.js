import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  getCategoryByid
} from "../controllers/category.controller.js";
import { auth } from "../middleware/auth/auth.js";
import { multer4server } from "../services/multer.js";
import { validate } from "../middleware/validation/execution.js";
import {
  categorySchema,
  updateCategorySchema,
} from "../middleware/validation/schema.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  multer4server().single("image"),
  validate(categorySchema),
  auth(["admin"]),
  createCategory
);
categoryRoutes.put(
  "/",
  multer4server().single("image"),
  auth(["admin"]),
  validate(updateCategorySchema),
  updateCategory
);
categoryRoutes.delete("/:id", auth(["admin"]), deleteCategory);
categoryRoutes.get("/", auth(["admin", "customer", "staff"]), getCategories);
categoryRoutes.get("/:id", auth(["admin", "customer", "staff"]), getCategoryByid);
export default categoryRoutes;
