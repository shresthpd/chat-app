// models/message.js
import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches the name of your User model
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches the name of your User model
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Ensure this matches the name of your Chat model
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Corrected the key from `timeStamp` to `timestamps`
  }
);

export const Message = mongoose.model("Message", messageModel);
