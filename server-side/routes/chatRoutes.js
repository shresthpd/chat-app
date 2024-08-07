import express from "express";
import protect from "../middlewares/protect.js";
import {
  addGroupMember,
  createGroup,
  fetchAllGroups,
  fetchAllUsers,
  sendMessage,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/fetchAllUsers", protect, fetchAllUsers);
chatRouter.get("/allGroups", fetchAllGroups);
chatRouter.post("/messages", protect, sendMessage);
chatRouter.post("/add-member", protect, addGroupMember);
chatRouter.post("/create-group", createGroup);
export default chatRouter;
