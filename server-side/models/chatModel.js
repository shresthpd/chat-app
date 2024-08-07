import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      required: function () {
        return this.isGroup;
      },
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

export { Chat };
