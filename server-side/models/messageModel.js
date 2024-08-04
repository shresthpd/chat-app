import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

export const Message = mongoose.Model("Message", messageModel);
