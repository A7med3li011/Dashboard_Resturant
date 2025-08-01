import express from "express";
import { multer4server } from "../services/multer.js";
import {
  createTable,
  getTables,
  updateTable,
} from "../controllers/tables.controller.js";
import { auth } from "../middleware/auth/auth.js";

import { validate } from "../middleware/validation/execution.js";
import { updateTableSchema } from "../middleware/validation/schema.js";

const tablesRoutes = express.Router();

tablesRoutes.post(
  "/",
  multer4server().single("image"),
  auth(["admin"]),
  createTable
);
tablesRoutes.get("/", auth(["admin", "waiter", "operation"]), getTables);
tablesRoutes.put(
  "/:id",
  auth(["admin", "waiter", "operation"]),
  validate(updateTableSchema),
  updateTable
);

export default tablesRoutes;
