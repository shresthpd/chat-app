import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController.js";
import protect from "../middlewares/protect.js";

export const userRoutes = express.Router();

userRoutes.post("/login", loginController);
userRoutes.post("/register", registerController);
