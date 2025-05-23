import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "subCategory",
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  ingredients: [{ type: String }],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
