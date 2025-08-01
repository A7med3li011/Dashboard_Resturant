import express from "express";
import { auth } from "../middleware/auth/auth.js";
import {
  handleCheckIn,
  handleCheckOut,
} from "../controllers/attendance.controller.js";

const attendanceRoutes = express.Router();

attendanceRoutes.post("/checkin", auth(["staff", "waiter"]), handleCheckIn);
attendanceRoutes.post("/checkout", auth(["staff", "waiter"]), handleCheckOut);

export default attendanceRoutes;
