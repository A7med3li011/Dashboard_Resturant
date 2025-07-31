import express from "express";

import { auth } from "../middleware/auth/auth.js";
import { multer4server } from "../services/multer.js";
import {
  addProduct,
  getProducts,
  getProductsbySub,
  updateProduct,
} from "../controllers/product.controller.js";

const proudctRoutes = express.Router();

proudctRoutes.post(
  "/",
  multer4server().single("image"),
  auth(["admin"]),
  addProduct
);
proudctRoutes.put(
  "/:id",
  multer4server().single("image"),
  auth(["admin"]),
  updateProduct
);

proudctRoutes.get(
  "/",

  auth(["customer", "staff", "admin"]),
  getProducts
);
proudctRoutes.get(
  "/bysubcat/:id",

  auth(["customer", "staff", "admin"]),
  getProductsbySub
);

export default proudctRoutes;
