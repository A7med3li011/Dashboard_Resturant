import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    pic: { type: String },
    phone: { type: String },

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
export default userModel;
