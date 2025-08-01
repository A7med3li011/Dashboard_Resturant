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
  auth(["customer", "admin","waiter","operation"]),
  validate(createOrderSchema),
  createOrder
);
orderRoutes.put(
  "/:id",
  auth(["admin","operation"]),

  updateOrder
);
orderRoutes.patch(
  "/",
  auth(["admin","operation", "staff","waiter"]),

  updateOrderStatus
);
orderRoutes.get(
  "/getbykitchen/:id",
  auth(["admin","operation", "staff"]),
  //   validate(createOrderSchema),
  getOrderBYKitchen
);
orderRoutes.get(
  "/",
  auth(["admin","operation","waiter"]),
  //   validate(createOrderSchema),
  getAllOrders
);

export default orderRoutes;
