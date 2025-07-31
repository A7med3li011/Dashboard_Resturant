import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderBYKitchen,
  updateOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { validate } from "../middleware/validation/execution.js";
import { createOrderSchema } from "../middleware/validation/schema.js";
import { auth } from "../middleware/auth/auth.js";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  auth(["customer", "admin", "staff"]),
  validate(createOrderSchema),
  createOrder
);
orderRoutes.put(
  "/:id",
  auth(["admin", "staff"]),

  updateOrder
);
orderRoutes.patch(
  "/",
  auth(["admin", "staff"]),

  updateOrderStatus
);
orderRoutes.get(
  "/getbykitchen/:id",
  auth(["admin", "staff"]),
  //   validate(createOrderSchema),
  getOrderBYKitchen
);
orderRoutes.get(
  "/",
  auth(["admin", "staff"]),
  //   validate(createOrderSchema),
  getAllOrders
);

export default orderRoutes;
