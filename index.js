import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connection from "./DataBase/connection.js";
import { AppError } from "./src/utilities/AppError.js";
import userRoutes from "./src/Routes/user.routes.js";


import categoryRoutes from "./src/Routes/category.routes.js";

connection();
const app = express();
app.use(cors());
app.use(express.json());

// Make 'uploads' folder publicly accessible
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoutes);

// handle foriegn routes

app.all("*", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

//global handle error
app.use((err, req, res, next) => {
  if (err)
    return res.status(err.statusCode || 400).json({ message: err.message });
});
const myport = process.env.PORT || 5000;
app.listen(myport, () => {
  console.log(`server on port ${myport} `);
});
