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
  auth(["admin", "operation"]),
  addProduct
);
proudctRoutes.put(
  "/:id",
  multer4server().single("image"),
  auth(["admin", "operation"]),
  updateProduct
);

proudctRoutes.get(
  "/",

  auth(["customer", "staff", "waiter", "admin", "operation"]),
  getProducts
);
proudctRoutes.get(
  "/bysubcat/:id",

  auth(["customer", "admin", "operation"]),
  getProductsbySub
);

export default proudctRoutes;
