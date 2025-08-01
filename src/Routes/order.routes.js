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
import { checkRole } from "../middleware/auth/roleAuth.js";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  validate(createOrderSchema),
  createOrder
);
orderRoutes.put(
  "/:id",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  updateOrder
);
orderRoutes.patch(
  "/",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  updateOrderStatus
);
orderRoutes.get(
  "/getbykitchen/:id",
  auth(["admin", "staff", "operation"]),
  checkRole(["admin", "staff", "operation"]),
  getOrderBYKitchen
);
orderRoutes.get(
  "/",
  auth(["admin", "operation", "waiter"]),
  checkRole(["admin", "operation", "waiter"]),
  getAllOrders
);

export default orderRoutes;
