import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../config/generateToken.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

// Login Controller
const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

// Register Controller
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All input fields are necessary");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const usernameExist = await User.findOne({ name });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username already taken");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
});

export { loginController, registerController };
