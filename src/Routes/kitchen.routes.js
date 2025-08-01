import express from "express";
import {
  add_kitchen,
  get_kitchens,
} from "../controllers/kitchen.controller.js";
import { multer4server } from "../services/multer.js";
import { auth } from "../middleware/auth/auth.js";

const kitchenRotes = express.Router();

kitchenRotes.post(
  "/",
  multer4server().single("image"),
  auth(["admin"]),
  add_kitchen
);
kitchenRotes.get("/", auth(["admin","operation"]), get_kitchens);

export default kitchenRotes;
