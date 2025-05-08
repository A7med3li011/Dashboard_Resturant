import express from "express";
import { handleLogin, handleRegister } from "../controllers/user.controller.js";
import { validate } from "../middleware/validation/execution.js";
import {
  loginSchema,
  registerSchema,
} from "../middleware/validation/schema.js";

const userRoutes = express.Router();

userRoutes.post("/register", validate(registerSchema), handleRegister);
userRoutes.post("/login", validate(loginSchema), handleLogin);

export default userRoutes;
