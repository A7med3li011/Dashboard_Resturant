import userModel from "../../DataBase/models/user.model.js";
import { AppError } from "../utilities/AppError.js";
import { handlerAsync } from "../utilities/handleAsync.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const handleRegister = handlerAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const emailExist = await userModel.findOne({ email });

  if (emailExist) return next(new AppError("email already exist", 409));
  const hashedPassword = await bcrypt.hash(password, +process.env.SLAT);

  await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
    phone,
  });

  res.status(201).json({ message: "user created successfully" });
});

export const handleLogin = handlerAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    const checkPassword = await bcrypt.compare(password, emailExist.password);

    if (!checkPassword) return next(new AppError("password is incorrect", 400));

    const user = await userModel.findOne({ email }).select("-password");

    const token = jwt.sign({ user }, process.env.SECRETEKEY);

    res.json({ message: "login successfully", user: user, token });
  } else {
    return next(new AppError("email is not exsit", 404));
  }
});

export const handleUpdateUser = handlerAsync(async (req, res, next) => {
  const userExist = await userModel.findById({ _id: req.user._id });

  if (!userExist) return next(new AppError("user not found", 404));
  let user = {};
  if (req.file) {
    const alldata = { ...req.body, pic: req.file.filename };
    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { ...alldata },
      { new: true }
    );
  } else {
    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true }
    );
  }

  res.status(200).json({ message: "user updated successfully", data: user });
});
