import express from "express";

import { auth } from "../middleware/auth/auth.js";
import { checkRole } from "../middleware/auth/roleAuth.js";
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
  checkRole(["admin", "operation"]),
  addProduct
);
proudctRoutes.put(
  "/:id",
  multer4server().single("image"),
  auth(["admin", "operation"]),
  checkRole(["admin", "operation"]),
  updateProduct
);

proudctRoutes.get(
  "/",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  getProducts
);
proudctRoutes.get(
  "/bysubcat/:id",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  getProductsbySub
);

export default proudctRoutes;
