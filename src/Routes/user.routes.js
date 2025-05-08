import express from "express";
import {
  handleLogin,
  handleRegister,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validation/execution.js";
import {
  loginSchema,
  registerSchema,
} from "../middleware/validation/schema.js";
import { auth } from "../middleware/auth/auth.js";
import { multer4server } from "../services/multer.js";

const userRoutes = express.Router();

userRoutes.post("/register", validate(registerSchema), handleRegister);
userRoutes.post("/login", validate(loginSchema), handleLogin);
userRoutes.put(
  "/update",
  multer4server().single("image"),
  auth(["customer", "staff", "admin"]),
  handleUpdateUser
);

export default userRoutes;
