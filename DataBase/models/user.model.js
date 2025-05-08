import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, required: true },
    phone: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["admin", "staff", "customer"],
      default: "customer",
    },
    // hisOrders: [],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel
